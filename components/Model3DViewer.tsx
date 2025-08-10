import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Model3DViewerProps {
  modelUrl?: string
  className?: string
}

export default function Model3DViewer({ modelUrl, className = '' }: Model3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-10, -5, -5)
    scene.add(fillLight)

    // Load model if provided
    if (modelUrl) {
      const loader = new GLTFLoader()
      
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene
          
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 2 / maxDim
          model.scale.setScalar(scale)
          
          model.position.sub(center.multiplyScalar(scale))
          
          // Enable shadows
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          
          scene.add(model)
          setLoading(false)
          
          // Auto-rotate animation
          const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)
            model.rotation.y += 0.005
            renderer.render(scene, camera)
          }
          animate()
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
        },
        (error) => {
          console.error('Error loading model:', error)
          setError('Ошибка загрузки 3D модели')
          setLoading(false)
        }
      )
    } else {
      // If no model URL, show a placeholder with basic geometry
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshPhongMaterial({ color: 0x6366f1 })
      const cube = new THREE.Mesh(geometry, material)
      cube.castShadow = true
      cube.receiveShadow = true
      scene.add(cube)
      
      setLoading(false)
      
      // Animate placeholder
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }
      animate()
    }

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return
      
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [modelUrl])

  return (
    <div className={`model-3d-viewer-container ${className}`}>
      <div ref={mountRef} className="model-3d-canvas-container" />
      
      {loading && (
        <div className="model-loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p>Загрузка 3D модели...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="model-error-overlay">
          <div className="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .model-3d-viewer-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
        }

        .model-3d-canvas-container {
          width: 100%;
          height: 100%;
        }

        .model-3d-canvas-container canvas {
          border-radius: 20px;
        }

        .model-loading-overlay,
        .model-error-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          border-radius: 20px;
        }

        .loading-spinner,
        .error-message {
          text-align: center;
          color: #666666;
        }

        .spinner-icon {
          margin-bottom: 12px;
          color: #6366f1;
          animation: spin 2s linear infinite;
        }

        .loading-spinner p,
        .error-message p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }

        .error-message svg {
          margin-bottom: 12px;
          color: #ef4444;
        }

        @keyframes spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        /* Dark theme support */
        :global(body.dark-theme) .model-loading-overlay,
        :global(body.dark-theme) .model-error-overlay {
          background: rgba(17, 17, 17, 0.95);
        }

        :global(body.dark-theme) .loading-spinner,
        :global(body.dark-theme) .error-message {
          color: #ffffff;
        }
      `}</style>
    </div>
  )
}
