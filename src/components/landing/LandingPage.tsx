import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { QuizQuestion, QuizResult, questions } from './Quiz'
import { sections } from './sections'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number[]>>({})
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const totalSections = sections.length + questions.length + 1

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.round(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScroll)
    return () => { if (container) container.removeEventListener('scroll', handleScroll) }
  }, [])

  const scrollTo = (index: number) => {
    containerRef.current?.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
  }

  const handleToggle = (qIndex: number, oIndex: number, type: string) => {
    setAnswers((prev) => {
      const current = prev[qIndex] ?? []
      if (type === 'single') return { ...prev, [qIndex]: [oIndex] }
      if (current.includes(oIndex)) return { ...prev, [qIndex]: current.filter((i) => i !== oIndex) }
      return { ...prev, [qIndex]: [...current, oIndex] }
    })
  }

  const handleCheck = (qIndex: number) => {
    setChecked((prev) => ({ ...prev, [qIndex]: true }))
  }

  const score = questions.filter((q, qi) => {
    const chosen = answers[qi] ?? []
    return chosen.length === q.correct.length && q.correct.every((c) => chosen.includes(c))
  }).length

  const handleReset = () => {
    setAnswers({})
    setChecked({})
    scrollTo(sections.length)
  }

  return (
    <Layout>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
            onButtonClick={section.showButton ? () => scrollTo(sections.length) : undefined}
          />
        ))}
        {questions.map((q, qi) => (
          <QuizQuestion
            key={q.id}
            question={q}
            qIndex={qi}
            total={questions.length}
            checked={!!checked[qi]}
            selected={answers[qi] ?? []}
            onToggle={(oIndex) => handleToggle(qi, oIndex, q.type)}
            onCheck={() => handleCheck(qi)}
            isLast={qi === questions.length - 1}
          />
        ))}
        <QuizResult
          score={score}
          total={questions.length}
          onReset={handleReset}
        />
      </div>
    </Layout>
  )
}
