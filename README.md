
# D&D 5e Spell Builder

Интерактивный сайт-конструктор заклинаний под систему «три кошелька» v 3.1.

## Быстрый старт

```bash
git clone <this‑repo>
cd spell-builder
npm install
npm run dev  # локальный сервер http://localhost:5173
```

## Сборка

```bash
npm run build   # оптимизированный билд в dist/
npm run preview # локальный preview билда
```

## Стэк

* [Vite](https://vitejs.dev/) + React 18
* TailwindCSS 3 (CDN‑build через PostCSS)
* Простая структура компонентов без глобального стейта

## Как расширить

* Все таблицы тегов и лимиты — в `src/components/data.js`.
* Добавляйте новые поля, группы, логику расчёта (масштаб дайсов, райдеры, скидки) по мере надобности.
