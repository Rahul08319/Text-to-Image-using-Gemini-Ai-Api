import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Loader2, Sparkles, Download, Copy, RefreshCw } from 'lucide-react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your image')
      return
    }

    setIsGenerating(true)
    setError('')
    
    try {
      const response = await fetch('/api/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      if (data.success && data.image) {
        setGeneratedImage({
          url: data.image,
          prompt: data.prompt,
          generatedText: data.generated_text
        })
      } else {
        throw new Error('No image was generated')
      }
    } catch (err) {
      console.error('Error generating image:', err)
      setError(err.message || 'Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage.url
      link.download = `gemini-generated-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
  }

  const handleReset = () => {
    setPrompt('')
    setGeneratedImage(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Gemini AI Image Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with Google's Gemini AI. 
            Simply describe what you want to see, and watch it come to life.
          </p>
          <Badge variant="secondary" className="mt-4">
            Powered by Gemini 2.5 Flash Image
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Describe Your Image
              </CardTitle>
              <CardDescription>
                Be as detailed as possible for the best results. Include style, colors, mood, and composition.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="A majestic dragon soaring through a sunset sky over ancient mountains, digital art style with vibrant colors..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 resize-none"
                disabled={isGenerating}
              />
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleCopyPrompt}
                  disabled={!prompt.trim()}
                  title="Copy prompt"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleReset}
                  title="Reset"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
              <CardDescription>
                Your AI-generated artwork will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">Creating your masterpiece...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="relative group w-full h-full">
                    <img 
                      src={generatedImage.url} 
                      alt={generatedImage.prompt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleDownload}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Your generated image will appear here</p>
                  </div>
                )}
              </div>
              
              {generatedImage && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Prompt used:</p>
                  <p className="text-sm text-muted-foreground">{generatedImage.prompt}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Sparkles className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold mb-2">High-Quality Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Google's latest Gemini 2.5 Flash Image model for stunning, detailed results.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <RefreshCw className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Iterative Refinement</h3>
                <p className="text-sm text-muted-foreground">
                  Refine and adjust your images through conversational prompts and iterations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Download className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">Easy Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download your generated images in high resolution for any use case.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
