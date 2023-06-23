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

    useEffect(() => {
        const filledMatrix = getFilledMatrix(n)
        setMatrix(filledMatrix)
    }, [])

    return (
        <main className="flex h-screen flex-col p-24">
            <div className="flex justify-between items-center mb-12">
                <div className="inline-flex" role="group">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-l-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                        onClick={() => increaseMatrix()}
                    >
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 fill-current" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                            <path
                                d="M18 .989a1.016 1.016 0 0 0-.056-.277c-.011-.034-.009-.073-.023-.1a.786.786 0 0 0-.066-.1.979.979 0 0 0-.156-.224l-.007-.01a.873.873 0 0 0-.116-.073.985.985 0 0 0-.2-.128.959.959 0 0 0-.231-.047A.925.925 0 0 0 17 0h-4a1 1 0 1 0 0 2h1.664l-3.388 3.552a1 1 0 0 0 1.448 1.381L16 3.5V5a1 1 0 0 0 2 0V.989ZM17 12a1 1 0 0 0-1 1v1.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L14.586 16H13a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM3.414 2H5a1 1 0 0 0 0-2H1a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V3.414l3.536 3.535A1 1 0 0 0 6.95 5.535L3.414 2Zm2.139 9.276L2 14.665V13a1 1 0 1 0-2 0v4c.006.046.015.09.027.135.006.08.022.16.048.235a.954.954 0 0 0 .128.2.95.95 0 0 0 .073.117l.01.007A.983.983 0 0 0 1 18h4a1 1 0 0 0 0-2H3.5l3.436-3.276a1 1 0 0 0-1.38-1.448h-.003Z"/>
                        </svg>
                        Increase
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-transparent border-t border-b border-emerald-700 hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                        onClick={() => resetMatrix()}
                    >
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 fill-current" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                            <path
                                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        Reset
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-r-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
                        onClick={() => reduceMatrix()}
                    >
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 fill-current" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M7 1a1 1 0 0 0-1 1v2.586L2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6H2a1 1 0 0 0 0 2h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Zm0 11H2a1 1 0 1 0 0 2h2.586l-3.293 3.293a1 1 0 1 0 1.414 1.414L6 15.414V18a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm11-6h-2.586l3.293-3.293a1 1 0 1 0-1.414-1.414L14 4.586V2a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2Zm1 7a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-2.586l3.293 3.293a1 1 0 0 0 1.414-1.414L15.414 14H18a1 1 0 0 0 1-1Z"/>
                        </svg>
                        Reduce
                    </button>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-transparent border border-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:bg-emerald-700 focus:text-white"
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
                                {row.map((col, y) => (
                                    <td
                                        key={`r${i}c${y}`}
                                        className="px-6 py-4 border"
                                    >
                                        {col}
                                    </td>
                                ))}
                                <td className="px-6 py-4 border bg-neutral-100">
                                    {row.reduce((acc, curVal) => {
                                        return acc + curVal
                                    }, 0)}
                                </td>
                            </tr>
                        ))}
                        <tr className="text-right">
                            <td
                                className="px-6 py-4 border bg-neutral-100"
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
