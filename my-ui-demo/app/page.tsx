"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

interface ParameterData {
  id: string
  parameterType: string
  parameterName: string
  parameterAttribute: string
  parameterDescription: string
  isValid: string
  updater: string
  updateDate: string
}

export default function ParameterMaintenance() {
  const [newParameterType, setNewParameterType] = useState("")
  const [selectedParameterType, setSelectedParameterType] = useState("FEOL OSP成本料階")
  const [parameterName, setParameterName] = useState("")
  const [parameterAttribute, setParameterAttribute] = useState("")
  const [parameterDescription, setParameterDescription] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const [parameterTypes, setParameterTypes] = useState(["FEOL OSP成本料階", "FEOL OSP成本排除料號"])

  const [data, setData] = useState<ParameterData[]>([
    {
      id: "1",
      parameterType: "FEOL OSP成本料階",
      parameterName: "35",
      parameterAttribute: "",
      parameterDescription: "",
      isValid: "Y",
      updater: "",
      updateDate: "",
    },
    {
      id: "2",
      parameterType: "FEOL OSP成本排除料號",
      parameterName: "35.XXXXX.XXX",
      parameterAttribute: "",
      parameterDescription: "",
      isValid: "Y",
      updater: "",
      updateDate: "",
    },
  ])

  const handleAddParameterType = () => {
    if (newParameterType && !parameterTypes.includes(newParameterType)) {
      setParameterTypes([...parameterTypes, newParameterType])
      setSelectedParameterType(newParameterType)
      setNewParameterType("")
    }
  }

  const handleClearConditions = () => {
    setSelectedParameterType("FEOL OSP成本料階")
    setParameterName("")
    setParameterAttribute("")
    setParameterDescription("")
    setNewParameterType("")
  }

  const handleQuery = () => {
    // 實際應用中這裡會進行資料庫查詢
    console.log("查詢條件:", {
      parameterType: selectedParameterType,
      parameterName,
      parameterAttribute,
      parameterDescription,
    })
  }

  const handleAdd = () => {
    const newId = (Math.max(...data.map((d) => Number.parseInt(d.id))) + 1).toString()
    const newItem: ParameterData = {
      id: newId,
      parameterType: selectedParameterType,
      parameterName: parameterName || "",
      parameterAttribute: parameterAttribute || "",
      parameterDescription: parameterDescription || "",
      isValid: "Y",
      updater: "Current User",
      updateDate: new Date().toLocaleDateString("zh-TW"),
    }
    setData([...data, newItem])
    handleClearConditions()
  }

  const handleDelete = (id: string) => {
    if (confirm("確定要刪除此參數嗎？")) {
      setData(data.filter((item) => item.id !== id))
    }
  }

  const handleEdit = (id: string) => {
    const item = data.find((d) => d.id === id)
    if (item) {
      setSelectedParameterType(item.parameterType)
      setParameterName(item.parameterName)
      setParameterAttribute(item.parameterAttribute)
      setParameterDescription(item.parameterDescription)
      setEditingId(id)
    }
  }

  const handleUpdate = () => {
    if (editingId) {
      setData(
        data.map((item) =>
          item.id === editingId
            ? {
                ...item,
                parameterType: selectedParameterType,
                parameterName,
                parameterAttribute,
                parameterDescription,
                updater: "Current User",
                updateDate: new Date().toLocaleDateString("zh-TW"),
              }
            : item,
        ),
      )
      setEditingId(null)
      handleClearConditions()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-600 text-white text-center py-2 text-lg font-bold border-b-2 border-purple-700">
        參數維護
      </div>

      <div className="p-4">
        <div className="bg-white border border-gray-300 p-3 mb-4">
          <div className="grid grid-cols-12 gap-2 items-end mb-3">
            {/* 參數種類 */}
            <div className="col-span-3">
              <div className="flex items-center gap-1">
                <span className="bg-purple-200 px-2 py-1 text-xs font-medium border border-gray-400 min-w-[60px] text-center">
                  參數種類
                </span>
                <Input
                  placeholder="新增"
                  value={newParameterType}
                  onChange={(e) => setNewParameterType(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddParameterType()}
                  className="w-20 h-8 text-xs"
                />
                <Select value={selectedParameterType} onValueChange={setSelectedParameterType}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {parameterTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 參數名稱 */}
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="bg-purple-200 px-2 py-1 text-xs font-medium border border-gray-400 min-w-[60px] text-center">
                  參數名稱
                </span>
                <Input
                  value={parameterName}
                  onChange={(e) => setParameterName(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            {/* 參數屬性 */}
            <div className="col-span-2">
              <div className="flex items-center">
                <span className="bg-purple-200 px-2 py-1 text-xs font-medium border border-gray-400 min-w-[60px] text-center">
                  參數屬性
                </span>
                <Input
                  value={parameterAttribute}
                  onChange={(e) => setParameterAttribute(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            {/* 參數說明 */}
            <div className="col-span-4">
              <div className="flex items-center">
                <span className="bg-purple-200 px-2 py-1 text-xs font-medium border border-gray-400 min-w-[60px] text-center">
                  參數說明
                </span>
                <Input
                  value={parameterDescription}
                  onChange={(e) => setParameterDescription(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button onClick={handleQuery} variant="outline" size="sm" className="h-8 px-4 text-xs bg-transparent">
              Query
            </Button>
            <Button onClick={editingId ? handleUpdate : handleAdd} size="sm" className="h-8 px-4 text-xs">
              {editingId ? "Update" : "Add"}
            </Button>
            <Button
              onClick={handleClearConditions}
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs bg-transparent"
            >
              Clear
            </Button>
            {editingId && (
              <Button
                onClick={() => {
                  setEditingId(null)
                  handleClearConditions()
                }}
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="mb-2 text-blue-600 text-sm">Data count: {data.length}</div>

        <div className="bg-white border border-gray-300">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-200 border-b border-gray-400">
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  參數種類
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  參數名稱
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  參數屬性
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  參數說明
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  有效/無效
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  更新員工
                </TableHead>
                <TableHead className="font-bold text-black text-xs border-r border-gray-300 text-center">
                  更新日期
                </TableHead>
                <TableHead className="font-bold text-black text-xs text-center">修改</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <TableCell className="bg-purple-50 text-xs border-r border-gray-200 px-2 py-1">
                    {item.parameterType}
                  </TableCell>
                  <TableCell className="text-xs border-r border-gray-200 px-2 py-1">{item.parameterName}</TableCell>
                  <TableCell className="text-xs border-r border-gray-200 px-2 py-1">
                    {item.parameterAttribute}
                  </TableCell>
                  <TableCell className="text-xs border-r border-gray-200 px-2 py-1">
                    {item.parameterDescription}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 px-2 py-1">
                    <Select
                      value={item.isValid}
                      onValueChange={(value) => {
                        setData(data.map((d) => (d.id === item.id ? { ...d, isValid: value } : d)))
                      }}
                    >
                      <SelectTrigger className="h-6 text-xs w-[px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Y</SelectItem>
                        <SelectItem value="N">N</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs border-r border-gray-200 px-2 py-1">{item.updater}</TableCell>
                  <TableCell className="text-xs border-r border-gray-200 px-2 py-1">{item.updateDate}</TableCell>
                  <TableCell className="px-2 py-1">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(item.id)} className="h-6 w-6 p-0">
                        <Edit className="h-3 w-3 text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
