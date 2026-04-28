import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const questions = [
  {
    id: 1,
    text: "Кто руководит Министерством финансов РФ?",
    type: "single",
    options: [
      "Антон Германович Силуанов",
      "Мария Николаевна Новоселова",
      "Андрей Рыженков",
    ],
    correct: [0],
  },
  {
    id: 2,
    text: "Какие налоги относятся к региональным в Архангельской области согласно тексту?",
    type: "multi",
    options: [
      "Транспортный налог",
      "Налог на имущество организаций",
      "Налог на прибыль",
    ],
    correct: [0, 1],
  },
  {
    id: 3,
    text: "Какая льготная ставка по налогу на прибыль и для кого введена с 1 апреля 2026 года?",
    type: "single",
    options: [
      "5% для сельского хозяйства",
      "10% для IT, биотехнологий и робототехники",
      "15% для малого бизнеса",
    ],
    correct: [1],
  },
  {
    id: 4,
    text: "Какие федеральные органы, кроме Минфина, перечислены в тексте?",
    type: "multi",
    options: [
      "ФНС",
      "Федеральное казначейство",
      "Центральный банк",
      "Федеральная таможенная служба",
      "Счётная палата",
      "Министерство экономического развития",
    ],
    correct: [0, 1, 3, 4],
  },
  {
    id: 5,
    text: "На сколько процентов снизился муниципальный долг в Архангельской области в первом квартале 2026 года?",
    type: "single",
    options: ["на 2%", "на 4%", "на 10%"],
    correct: [1],
  },
]

export default function Quiz({ isActive }: { isActive: boolean }) {
  const [answers, setAnswers] = useState<Record<number, number[]>>({})
  const [checked, setChecked] = useState(false)

  const toggle = (qIndex: number, oIndex: number, type: string) => {
    if (checked) return
    setAnswers((prev) => {
      const current = prev[qIndex] ?? []
      if (type === "single") return { ...prev, [qIndex]: [oIndex] }
      if (current.includes(oIndex)) return { ...prev, [qIndex]: current.filter((i) => i !== oIndex) }
      return { ...prev, [qIndex]: [...current, oIndex] }
    })
  }

  const score = checked
    ? questions.filter((q, qi) => {
        const chosen = answers[qi] ?? []
        return (
          chosen.length === q.correct.length &&
          q.correct.every((c) => chosen.includes(c))
        )
      }).length
    : 0

  const getOptionStyle = (qIndex: number, oIndex: number, correct: number[]) => {
    if (!checked) {
      const selected = answers[qIndex]?.includes(oIndex)
      return selected
        ? "border-white text-white bg-white/10"
        : "border-neutral-700 text-neutral-400 hover:border-neutral-400 hover:text-white"
    }
    const selected = answers[qIndex]?.includes(oIndex)
    if (correct.includes(oIndex)) return "border-green-500 text-green-400 bg-green-500/10"
    if (selected && !correct.includes(oIndex)) return "border-red-500 text-red-400 bg-red-500/10"
    return "border-neutral-700 text-neutral-600"
  }

  return (
    <section className="relative w-full snap-start flex flex-col justify-start p-8 md:p-16 py-20">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Вопросы теста
      </motion.h2>

      <div className="space-y-10 max-w-2xl">
        {questions.map((q, qi) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 * qi }}
          >
            <p className="text-white text-lg font-medium mb-1">
              {qi + 1}. {q.text}
            </p>
            <p className="text-neutral-500 text-sm mb-3">
              {q.type === "multi" ? "Выбери все верные" : "Один правильный ответ"}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => toggle(qi, oi, q.type)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${getOptionStyle(qi, oi, q.correct)}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {!checked ? (
          <Button
            size="lg"
            className="bg-[#FF4D00] hover:bg-[#e04400] text-white border-0"
            onClick={() => setChecked(true)}
          >
            Проверить ответы
          </Button>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            <p className="text-white text-2xl font-bold">
              Правильно: {score} из {questions.length}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
              onClick={() => { setChecked(false); setAnswers({}) }}
            >
              Пройти снова
            </Button>
          </div>
        )}
      </motion.div>
    </section>
  )
}