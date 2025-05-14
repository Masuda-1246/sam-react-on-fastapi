import { useState } from 'react'
import { useGetTodosApiTodosGet, useCreateTodoApiTodosPost, useUpdateTodoApiTodosTodoIdPut, useDeleteTodoApiTodosTodoIdDelete } from './api/generated/fastAPIReactBackend'
import { TodoCreate, TodoResponse, TodoUpdate } from './api/model'
import { Trash2, Pencil, ChevronDown, ChevronRight } from 'lucide-react'

// UIコンポーネントのインポート
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Checkbox } from './components/ui/checkbox'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible'
import { cn } from './lib/utils'

function App() {
  // 状態管理
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  const [newTodoDescription, setNewTodoDescription] = useState<string>('')
  const [editingTodo, setEditingTodo] = useState<TodoResponse | null>(null)
  const [openUncompleted, setOpenUncompleted] = useState<boolean>(true)
  const [openCompleted, setOpenCompleted] = useState<boolean>(false)

  // APIフック
  const { data: todos, refetch: refetchTodos } = useGetTodosApiTodosGet()
  const createTodoMutation = useCreateTodoApiTodosPost()
  const updateTodoMutation = useUpdateTodoApiTodosTodoIdPut()
  const deleteTodoMutation = useDeleteTodoApiTodosTodoIdDelete()

  // Todo作成
  const handleCreateTodo = async () => {
    if (!newTodoTitle.trim()) return

    const newTodo: TodoCreate = {
      title: newTodoTitle,
      description: newTodoDescription || undefined,
      completed: false
    }

    try {
      await createTodoMutation.mutateAsync({ data: newTodo })
      setNewTodoTitle('')
      setNewTodoDescription('')
      refetchTodos()
    } catch (error) {
      console.error('Todo作成エラー:', error)
    }
  }

  // Todo更新
  const handleUpdateTodo = async (todoId: string, update: TodoUpdate) => {
    try {
      await updateTodoMutation.mutateAsync({ todoId, data: update })
      setEditingTodo(null)
      refetchTodos()
    } catch (error) {
      console.error('Todo更新エラー:', error)
    }
  }

  // Todo完了状態の切り替え
  const handleToggleComplete = async (todo: TodoResponse) => {
    await handleUpdateTodo(todo.id, { completed: !todo.completed })
  }

  // Todo削除
  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodoMutation.mutateAsync({ todoId })
      refetchTodos()
    } catch (error) {
      console.error('Todo削除エラー:', error)
    }
  }

  // 編集モードの開始
  const startEditing = (todo: TodoResponse) => {
    setEditingTodo(todo)
  }

  // 編集の保存
  const saveEdit = async () => {
    if (!editingTodo) return

    const update: TodoUpdate = {}
    if (editingTodo.title) update.title = editingTodo.title
    if (editingTodo.description) update.description = editingTodo.description

    await handleUpdateTodo(editingTodo.id, update)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Todoアプリケーション</h1>
      
      {/* Todo作成フォーム */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>新しいタスクを追加</CardTitle>
          <CardDescription>タスクのタイトルと説明を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="タスクタイトル"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="タスクの説明（任意）"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCreateTodo}
            className={cn(
              newTodoTitle.trim() ? "bg-black text-white hover:bg-black/90" : "bg-white text-black border border-gray-200 hover:bg-gray-100"
            )}
            disabled={!newTodoTitle.trim()}
          >
            追加
          </Button>
        </CardFooter>
      </Card>

      {/* Todoリスト */}
      <div className="space-y-8">
        {todos?.data?.length === 0 && (
          <p className="text-center text-gray-500">タスクがありません。新しいタスクを追加してください。</p>
        )}
        
        {/* 未完了タスク */}
        {todos?.data && todos.data.filter((todo: TodoResponse) => !todo.completed).length > 0 && (
          <Collapsible open={openUncompleted} onOpenChange={setOpenUncompleted} className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
              <div className="flex items-center">
                {openUncompleted ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
                <h2 className="text-xl font-bold">
                  未完了タスク ({todos.data.filter((todo: TodoResponse) => !todo.completed).length})
                </h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 p-4 pt-0">
                {todos?.data?.filter((todo: TodoResponse) => !todo.completed).map((todo: TodoResponse) => (
                  <Card key={todo.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => handleToggleComplete(todo)}
                          className="mt-1"
                        />
                        
                        <div className="flex-1">
                          {editingTodo?.id === todo.id ? (
                            <div className="space-y-3">
                              <Input
                                value={editingTodo.title}
                                onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
                              />
                              <Textarea
                                value={editingTodo.description || ''}
                                onChange={(e) => {
                                  if (editingTodo) {
                                    setEditingTodo({...editingTodo, description: e.target.value})
                                  }
                                }}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={saveEdit}>保存</Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingTodo(null)}>キャンセル</Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-lg font-medium">
                                {todo.title}
                              </h3>
                              {todo.description && (
                                <p className="mt-1 text-sm text-gray-600">
                                  {todo.description}
                                </p>
                              )}
                              <div className="mt-2 text-xs text-gray-400">
                                作成日: {new Date(todo.created_at).toLocaleString('ja-JP')}
                              </div>
                            </>
                          )}
                        </div>
                        
                        {editingTodo?.id !== todo.id && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => startEditing(todo)} 
                              className="p-2 hover:bg-black hover:text-white"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteTodo(todo.id)} 
                              className="p-2 text-red-500 hover:text-white hover:bg-red-500 border-red-200"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* 完了済みタスク */}
        {todos?.data && todos.data.filter((todo: TodoResponse) => todo.completed).length > 0 && (
          <Collapsible open={openCompleted} onOpenChange={setOpenCompleted} className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
              <div className="flex items-center">
                {openCompleted ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
                <h2 className="text-xl font-bold">
                  完了済みタスク ({todos.data.filter((todo: TodoResponse) => todo.completed).length})
                </h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 p-4 pt-0">
                {todos?.data?.filter((todo: TodoResponse) => todo.completed).map((todo: TodoResponse) => (
                  <Card key={todo.id} className="bg-gray-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => handleToggleComplete(todo)}
                          className="mt-1"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-medium line-through text-gray-500">
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className="mt-1 text-sm text-gray-400 line-through">
                              {todo.description}
                            </p>
                          )}
                          <div className="mt-2 text-xs text-gray-400">
                            作成日: {new Date(todo.created_at).toLocaleString('ja-JP')}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteTodo(todo.id)} 
                            className="p-2 text-red-500 hover:text-white hover:bg-red-500 border-red-200"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}

export default App
