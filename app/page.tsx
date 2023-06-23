'use client'

import React, { useState, useEffect } from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const MIN = 1
const MAX = 999
const DEFAULT = 10

export default function Home () {
    const [n, setN] = useState<number>(DEFAULT)
    const [matrix, setMatrix] = useState<number[][]>()

    const getRandomValue = () => {
        return Math.floor((Math.random() * (MAX - MIN + 1) + MIN))
    }

    const getFilledRow = (size: number) => {
        return [...new Array(size)].map(() => getRandomValue())
    }

    const getFilledMatrix = (size: number) => {
        return [...new Array(size)].map(() => getFilledRow(size))
    }

    const increaseMatrix = () => {
        if (n !== MAX) {
            const newSize = structuredClone(n) + 1
            const newMatrix = structuredClone(matrix)
            newMatrix?.forEach((row) => (
                row.push(getRandomValue())
            ))
            newMatrix?.push(getFilledRow(newSize))
            setMatrix(newMatrix)
            setN(newSize)
        }
    }

    const reduceMatrix = () => {
        if (n !== MIN) {
            const newSize = structuredClone(n) - 1
            const newMatrix = structuredClone(matrix)
            newMatrix?.forEach((row) => (
                row.pop()
            ))
            newMatrix?.pop()
            setMatrix(newMatrix)
            setN(newSize)
        }
    }

    const resetMatrix = () => {
        const filledMatrix = getFilledMatrix(DEFAULT)
        setMatrix(filledMatrix)
        setN(DEFAULT)
    }

    const exportToXLSX = async () => {
        if (matrix) {
            const ws = XLSX.utils.json_to_sheet(matrix, { skipHeader: true })
            const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
            FileSaver.saveAs(data, 'matrix.xlsx')
        }
    }

    const handleChange = (event: { target: HTMLInputElement }, i: number, j: number) => {
        if (matrix) {
            const newMatrix = structuredClone(matrix)
            const newValue = Math.max(MIN, Math.min(MAX, Number(event.target.value)))
            newMatrix[i][j] = newValue
            setMatrix(newMatrix)
        }
    }

    const handleFocus = (event: { target: HTMLInputElement }) => event.target.select()

    useEffect(() => {
        const filledMatrix = getFilledMatrix(n)
        setMatrix(filledMatrix)
    }, [])

    return (
        <main className="flex h-screen flex-col p-24 text-sm">
            <h4 className="text-2xl font-bold">Matrix {n} &times; {n}</h4>
            <div className="flex justify-between items-center mt-6 mb-12">
                <div className="flex items-stretch gap-24">
                    <div className="flex" role="group">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-l-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                            onClick={() => increaseMatrix()}
                        >
                            <svg aria-hidden="true" className="w-3 h-3 fill-current" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 font-medium text-emerald-700 bg-transparent border border-l-0 border-emerald-700 rounded-r-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                            onClick={() => reduceMatrix()}
                        >
                            <svg aria-hidden="true" className="w-3 h-3 fill-current" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                        onClick={() => resetMatrix()}
                    >
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 fill-current" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                            <path
                                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        Reset
                    </button>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                    onClick={() => exportToXLSX()}
                >
                    <svg aria-hidden="true" className="w-3 h-3 mr-2 fill-current" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path
                            d="M13.768 15.475a1 1 0 0 1-1.414-1.414L13.414 13H6a1 1 0 0 1 0-2h7.414l-1.06-1.061a1 1 0 1 1 1.414-1.414L16 10.757V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2H14a2 2 0 0 0 2-2v-4.757l-2.232 2.232Z"/>
                    </svg>
                    Export to XLSX
                </button>
            </div>
            <div className="relative overflow-auto">
                <table className="text-sm text-left">
                    <tbody>
                        {matrix && matrix.map((row, i) => (
                            <tr
                                key={`r${i}`}
                                className={i % 2 ? 'bg-white' : 'bg-neutral-50'}
                            >
                                {row.map((col, j) => (
                                    <td
                                        key={`r${i}c${j}`}
                                        className="border"
                                    >
                                        <input
                                            type="number"
                                            className="!border-0 !ring-0 !outline-0 bg-transparent flex h-full px-4 py-3"
                                            required
                                            min={MIN}
                                            max={MAX}
                                            value={col}
                                            onChange={(e) => handleChange(e, i, j)}
                                            onFocus={(e) => handleFocus(e)}
                                        />
                                    </td>
                                ))}
                                <td className="px-4 py-3 border bg-neutral-100">
                                    {row.reduce((acc, curVal) => {
                                        return acc + curVal
                                    }, 0)}
                                </td>
                            </tr>
                        ))}
                        <tr className="text-right">
                            <td
                                className="px-4 py-3 border bg-neutral-100"
                                colSpan={n + 1}
                            >
                            {matrix && matrix.reduce((acc, curVal) => acc.concat(curVal), []).reduce((acc, curVal) => {
                                return acc + curVal
                            }, 0)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}
