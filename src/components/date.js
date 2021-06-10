import React from "react";
import { parseISO } from 'date-fns'

const spaMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
]

const spaDays = [
  'do.',
  'lu.',
  'ma.',
  'mi.',
  'ju.',
  'vi.',
  'sá.'
]

const Sup = function ({ index }) {
  const suffixes = [
    <sup>er</sup>,
    <sup>do</sup>,
    <sup>er</sup>,
    <sup>to</sup>,
    <sup>to</sup>,
  ]
  return <>
    {index + 1}{suffixes[index]}
  </>
}

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>
    <Sup index={Math.floor(date.getDate() / 7)} />
    {' '}{spaDays[date.getDay()]} de {spaMonths[date.getMonth()]} de {date.getFullYear()}
  </time>
}
