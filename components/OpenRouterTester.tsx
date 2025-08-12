import { useState, useEffect } from 'react'

interface ModelInfo {
  id: string
  name: string
  description: string
  free: boolean
}

export default function OpenRouterTester() {
  const [selectedModel, setSelectedModel] = useState('meta-llama/llama-3.1-8b-instruct:free')
  const [testMessage, setTestMessage] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<'unknown' | 'connected' | 'error'>('unknown')
  const [testResults, setTestResults] = useState<any[]>([])

  const models: ModelInfo[] = [
    {
      id: 'meta-llama/llama-3.1-8b-instruct:free',
      name: 'Llama 3.1 8B',
      description: 'Быстрая бесплатная модель Meta',
      free: true
    },
    {
      id: 'microsoft/phi-3-mini-128k-instruct:free',
      name: 'Phi-3 Mini',
      description: 'Компактная модель Microsoft',
      free: true
    },
    {
      id: 'google/gemma-7b-it:free',
      name: 'Gemma 7B',
      description: 'Модель Google для инструкций',
      free: true
    },
    {
      id: 'mistralai/mistral-7b-instruct:free',
      name: 'Mistral 7B',
      description: 'Инструкционная модель Mistral AI',
      free: true
    },
    {
      id: 'openai/gpt-4o-mini',
      name: 'GPT-4o Mini',
      description: 'Компактная модель OpenAI (платная)',
      free: false
    },
    {
      id: 'openai/gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Стандартная модель OpenAI (платная)',
      free: false
    }
  ]

  const testModel = async () => {
    if (!testMessage.trim()) return

    setIsLoading(true)
    setResponse('')

    const startTime = Date.now()

    try {
      const res = await fetch('/api/test-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          message: testMessage
        }),
      })

      const data = await res.json()
      const endTime = Date.now()
      const duration = endTime - startTime

      if (res.ok) {
        setResponse(data.message)
        setApiStatus('connected')
        
        // Добавляем результат теста
        const testResult = {
          model: selectedModel,
          message: testMessage,
          response: data.message,
          duration,
          timestamp: new Date().toLocaleTimeString(),
          success: true
        }
        setTestResults(prev => [testResult, ...prev.slice(0, 4)]) // Показываем последние 5 тестов
      } else {
        setResponse(`Ошибка: ${data.error || 'Неизвестная ошибка'}`)
        setApiStatus('error')
        
        const testResult = {
          model: selectedModel,
          message: testMessage,
          response: data.error || 'Ошибка API',
          duration,
          timestamp: new Date().toLocaleTimeString(),
          success: false
        }
        setTestResults(prev => [testResult, ...prev.slice(0, 4)])
      }
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime
      
      setResponse(`Ошибка сети: ${error}`)
      setApiStatus('error')
      
      const testResult = {
        model: selectedModel,
        message: testMessage,
        response: `Ошибка сети: ${error}`,
        duration,
        timestamp: new Date().toLocaleTimeString(),
        success: false
      }
      setTestResults(prev => [testResult, ...prev.slice(0, 4)])
    } finally {
      setIsLoading(false)
    }
  }

  const quickTests = [
    'Привет, как дела?',
    'Объясни что такое React',
    'Напиши простой пример кода на JavaScript',
    'Какие тарифы доступны?'
  ]

  return (
    <div className="openrouter-tester">
      <div className="tester-container">
        <div className="tester-header">
          <h2>🤖 Тестирование моделей OpenRouter</h2>
          <div className={`api-status ${apiStatus}`}>
            <div className="status-indicator"></div>
            {apiStatus === 'connected' && 'Подключено'}
            {apiStatus === 'error' && 'Ошибка подключения'}
            {apiStatus === 'unknown' && 'Не протестировано'}
          </div>
        </div>

        <div className="tester-content">
          {/* Выбор модели */}
          <div className="model-selection">
            <h3>Выбор модели:</h3>
            <div className="models-grid">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="model-header">
                    <h4>{model.name}</h4>
                    <span className={`model-badge ${model.free ? 'free' : 'paid'}`}>
                      {model.free ? 'Бесплатно' : 'Платно'}
                    </span>
                  </div>
                  <p>{model.description}</p>
                  <code className="model-id">{model.id}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Тестирование */}
          <div className="test-section">
            <h3>Тестовое сообщение:</h3>
            
            {/* Быстрые тесты */}
            <div className="quick-tests">
              <span>Быстрые тесты:</span>
              {quickTests.map((test, index) => (
                <button
                  key={index}
                  className="quick-test-btn"
                  onClick={() => setTestMessage(test)}
                >
                  {test}
                </button>
              ))}
            </div>

            <div className="test-input">
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Введите сообщение для тестирования модели..."
                rows={3}
              />
              <button
                onClick={testModel}
                disabled={isLoading || !testMessage.trim()}
                className="test-button"
              >
                {isLoading ? '⏳ Тестирую...' : '🚀 Протестировать'}
              </button>
            </div>

            {/* Ответ */}
            {response && (
              <div className="test-response">
                <h4>Ответ модели:</h4>
                <div className="response-content">
                  {response}
                </div>
              </div>
            )}
          </div>

          {/* История тестов */}
          {testResults.length > 0 && (
            <div className="test-history">
              <h3>История тестов:</h3>
              <div className="history-list">
                {testResults.map((result, index) => (
                  <div key={index} className={`history-item ${result.success ? 'success' : 'error'}`}>
                    <div className="history-header">
                      <span className="model-name">{result.model.split('/')[1]}</span>
                      <span className="timestamp">{result.timestamp}</span>
                      <span className="duration">{result.duration}ms</span>
                    </div>
                    <div className="history-message">📝 {result.message}</div>
                    <div className="history-response">
                      {result.success ? '✅' : '❌'} {result.response.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .openrouter-tester {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          margin: 40px 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e5e7;
        }

        .tester-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .tester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f1f3f4;
        }

        .tester-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .api-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
        }

        .api-status.connected {
          background: #dcfce7;
          color: #166534;
        }

        .api-status.error {
          background: #fef2f2;
          color: #dc2626;
        }

        .api-status.unknown {
          background: #f3f4f6;
          color: #6b7280;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .api-status.connected .status-indicator {
          background: #10b981;
        }

        .api-status.error .status-indicator {
          background: #ef4444;
        }

        .api-status.unknown .status-indicator {
          background: #9ca3af;
        }

        .tester-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .model-selection h3,
        .test-section h3,
        .test-history h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1f2937;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }

        .model-card {
          padding: 20px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #ffffff;
        }

        .model-card:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .model-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        }

        .model-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .model-header h4 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .model-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .model-badge.free {
          background: #dcfce7;
          color: #166534;
        }

        .model-badge.paid {
          background: #fef3c7;
          color: #92400e;
        }

        .model-card p {
          margin: 8px 0;
          color: #6b7280;
          font-size: 14px;
        }

        .model-id {
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 6px;
          color: #4b5563;
        }

        .quick-tests {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 16px;
        }

        .quick-tests span {
          font-size: 14px;
          color: #6b7280;
          margin-right: 8px;
        }

        .quick-test-btn {
          padding: 6px 12px;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-test-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .test-input {
          display: flex;
          gap: 16px;
          align-items: flex-end;
        }

        .test-input textarea {
          flex: 1;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 16px;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .test-input textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .test-button {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .test-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .test-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .test-response {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
        }

        .test-response h4 {
          margin: 0 0 12px 0;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .response-content {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .test-history {
          border-top: 2px solid #f1f3f4;
          padding-top: 32px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .history-item {
          padding: 16px;
          border-radius: 12px;
          border-left: 4px solid #e5e7eb;
        }

        .history-item.success {
          background: #f0fdf4;
          border-left-color: #10b981;
        }

        .history-item.error {
          background: #fef2f2;
          border-left-color: #ef4444;
        }

        .history-header {
          display: flex;
          gap: 16px;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .model-name {
          background: #667eea;
          color: white;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .timestamp {
          color: #6b7280;
        }

        .duration {
          color: #059669;
        }

        .history-message {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .history-response {
          font-size: 13px;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .openrouter-tester {
            padding: 20px;
            margin: 20px 0;
          }

          .tester-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .models-grid {
            grid-template-columns: 1fr;
          }

          .test-input {
            flex-direction: column;
            align-items: stretch;
          }

          .quick-tests {
            flex-direction: column;
            align-items: flex-start;
          }

          .history-header {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}
