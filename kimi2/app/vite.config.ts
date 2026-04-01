import path from "path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Локально проксирует POST /api/bitrix-lead → тот же обработчик, что на Vercel */
function bitrixLeadDevApi(): Plugin {
  return {
    name: 'bitrix-lead-dev-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, path.resolve(__dirname), '')
      if (env.BITRIX24_WEBHOOK_URL) {
        process.env.BITRIX24_WEBHOOK_URL = env.BITRIX24_WEBHOOK_URL
      }
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''
        if (pathname !== '/api/bitrix-lead') {
          next()
          return
        }
        try {
          const { default: handler } = await import(
            new URL('./server/bitrix-lead-handler.mjs', import.meta.url).href
          )
          await handler(req, res)
        } catch (e) {
          console.error('[bitrix-lead]', e)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Ошибка сервера API.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [bitrixLeadDevApi(), inspectAttr(), react()],
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
