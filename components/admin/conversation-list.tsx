"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Conversation {
  id: string
  user_id: string
  created_at: string
  last_activity: string
  booking_count: number
  server_hash?: string
  client_fp?: string
}

interface ConversationListProps {
  conversations: Conversation[]
}

export default function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="p-4 space-y-3 h-full overflow-y-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-blue-800">
          <strong>Modo Demo:</strong> Lista de conversaciones con datos mock
        </p>
      </div>

      {conversations.map((conversation) => (
        <Card key={conversation.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Usuario {conversation.user_id.slice(0, 8)}</CardTitle>
              <Badge variant={conversation.booking_count > 0 ? "default" : "secondary"}>
                {conversation.booking_count} bookings
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs text-gray-500">
              <p>ID: {conversation.id.slice(0, 12)}</p>
              <p>Creado: {new Date(conversation.created_at).toLocaleDateString()}</p>
              <p>Última actividad: {new Date(conversation.last_activity).toLocaleDateString()}</p>
              {conversation.server_hash && <p>Hash: {conversation.server_hash.slice(0, 8)}</p>}
              {conversation.client_fp && <p>FP: {conversation.client_fp.slice(0, 8)}</p>}
            </div>
          </CardContent>
        </Card>
      ))}

      {conversations.length === 0 && <div className="text-center py-8 text-gray-500">No hay conversaciones</div>}
    </div>
  )
}
