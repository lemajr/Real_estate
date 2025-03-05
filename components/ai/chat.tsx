'use client'

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useChat } from "@ai-sdk/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Loader2, XCircle, Sparkles } from "lucide-react"
import { MdArrowDownward } from "react-icons/md"

type CodeProps = {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({
    api: "api/gemini",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Greetings! I'm Blackwill Assistant, your trusted assistant for real estate and medical tourism. We specialize in helping you find the best hospital allocations, accommodations, and property listings. Whether you're looking for a house, apartment, or medical services, I will guide you through the process.",
      },
    ],
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => setIsChatOpen((prev) => !prev)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 100,
      transition: { duration: 0.2 },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          className="relative overflow-hidden rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 via-indigo-500 to-cyan-400 p-0 shadow-lg shadow-purple-500/30"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {!isChatOpen ? (
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />

          ) : (

          <MdArrowDownward className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 animate-bounce" />
          )}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 blur opacity-75"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-20 sm:bottom-28 right-4 sm:right-8 z-50 w-[90vw] max-w-[380px] sm:w-[380px] max-h-[70vh] sm:max-h-[80vh]"
          >
            <div className="relative bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-gray-700/50 overflow-hidden">
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg">
                        Blackwill Assistant
                      </h3>
                      <p className="text-xs text-purple-300">Powered by LemAi</p>
                    </div>
                  </div>
                  <Button
                    onClick={toggleChat}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[50vh] sm:h-[450px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl relative ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                          : "bg-gray-700/50 text-white"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="text-white text-sm">{children}</p>
                          ),
                          code: ({ inline, children, className, ...props }: CodeProps) =>
                            inline ? (
                              <code
                                className={`bg-gray-800/50 px-1 sm:px-1.5 py-0.5 rounded-md text-white text-xs ${className || ""}`}
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre
                                className={`bg-gray-800/50 p-2 sm:p-3 rounded-lg overflow-x-auto ${className || ""}`}
                                {...props}
                              >
                                <code className="text-white text-xs ">{children}</code>
                              </pre>
                            ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 space-y-1 text-white text-xs">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 space-y-1 text-white text-xs ">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-white text-sm ">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-white">{children}</strong>
                          ),
                          em: ({ children }) => (
                            <em className="text-white">{children}</em>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                      {message.role === "assistant" && (
                        <motion.div
                          className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="flex justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-spin" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={stop}
                      className="text-gray-400 hover:text-white text-sm sm:text-base"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    className="flex justify-center gap-2 text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="text-sm sm:text-base">Connection lost</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => reload()}
                      className="text-red-400 hover:text-red-300 text-sm sm:text-base"
                    >
                      Retry
                    </Button>
                  </motion.div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-3 sm:p-4 border-t border-gray-700/50"
              >
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 w-10 sm:w-12 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}