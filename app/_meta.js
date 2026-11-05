import { createElement as h } from 'react'
import { githubUrl, npmUrl } from '../components/navigationSections'
import { ExternalIcon } from '../components/ExternalIcon'

function section(label, path) {
  return h('span', { className: 'sidebar-section' },
    h('svg', {
      'aria-hidden': true,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }, h('path', { d: path })),
    h('span', { className: 'sidebar-section-label' }, label),
  )
}

export default {
  index: section('SNEO', 'M3 10l9-7 9 7v10H3z M9 20v-6h6v6'),
  'primeros-pasos': section('Primeros pasos', 'M3 4h5a4 4 0 0 1 4 4v13a4 4 0 0 0-4-4H3z M21 4h-5a4 4 0 0 0-4 4v13a4 4 0 0 1 4-4h5z'),
  componentes: section('Componentes', 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z'),
  tema: section('Constructor de tema', 'M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6'),
  playground: section('Playground', 'M3 4h18v16H3z M7 9l3 3-3 3 M13 15h4'),
  github: { title: h('span', { className: 'sidebar-section' }, h(ExternalIcon, { service: 'github' }), h('span', { className: 'external-link-label' }, 'GitHub')), href: githubUrl },
  npm: { title: h('span', { className: 'sidebar-section' }, h(ExternalIcon, { service: 'npm' }), h('span', { className: 'external-link-label' }, 'npm')), href: npmUrl },
  '*': { type: 'doc', theme: { breadcrumb: false } },
}
