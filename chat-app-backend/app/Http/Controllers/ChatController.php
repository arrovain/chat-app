<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function join(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
        ]);

        return response()->json(['success' => true, 'message' => 'Başarıyla katıldınız']);
    }

    public function getChatLogs()
    {
        $logs = ChatMessage::orderBy('created_at', 'asc')->get()->map(function($message) {
            return [
                'nickname' => $message->nickname,
                'message' => $message->message,
                'created_at' => $message->created_at->toDateTimeString()
            ];
        });
        return response()->json($logs);
    }

    public function saveMessage(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $message = ChatMessage::create($request->only(['nickname', 'message']));
        return response()->json($message);
    }
}