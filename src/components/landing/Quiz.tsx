import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const questions = [
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

const visible = { opacity: 1, y: 0 }
const hidden = { opacity: 0, y: 20 }

interface QuizQuestionProps {
  question: typeof questions[0]
  qIndex: number
  total: number
  isActive: boolean
  checked: boolean
  selected: number[]
  onToggle: (oIndex: number) => void
  onCheck: () => void
  isLast: boolean
}

export function QuizQuestion({
  question, qIndex, total, isActive, checked, selected, onToggle, onCheck, isLast,
}: QuizQuestionProps) {
  const getStyle = (oIndex: number) => {
    if (!checked) {
      return selected.includes(oIndex)
        ? "border-white text-white bg-white/10"
        : "border-neutral-700 text-neutral-400 hover:border-neutral-400 hover:text-white"
    }
    if (question.correct.includes(oIndex)) return "border-green-500 text-green-400 bg-green-500/10"
    if (selected.includes(oIndex)) return "border-red-500 text-red-400 bg-red-500/10"
    return "border-neutral-700 text-neutral-600"
  }

  const isCorrect =
    checked &&
    selected.length === question.correct.length &&
    question.correct.every((c) => selected.includes(c))

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.p
        className="text-neutral-500 text-sm mb-4 uppercase tracking-widest"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4 }}
      >
        Вопрос {qIndex + 1} из {total}
      </motion.p>

      <motion.h2
        className="text-2xl md:text-4xl font-bold text-white mb-2 max-w-2xl leading-tight"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {question.text}
      </motion.h2>

      <motion.p
        className="text-neutral-500 text-sm mb-6"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {question.type === "multi" ? "Выбери все верные варианты" : "Один правильный ответ"}
      </motion.p>

      <motion.div
        className="space-y-3 max-w-xl"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {question.options.map((opt, oi) => (
          <button
            key={oi}
            onClick={() => !checked && onToggle(oi)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${getStyle(oi)}`}
          >
            {opt}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex items-center gap-4 flex-wrap"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {!checked ? (
          <Button
            size="lg"
            disabled={selected.length === 0}
            className="bg-[#FF4D00] hover:bg-[#e04400] text-white border-0 disabled:opacity-40"
            onClick={onCheck}
          >
            Проверить ответ
          </Button>
        ) : (
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`text-lg font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? "Верно!" : "Неверно"}
            </span>
            {!isLast && (
              <p className="text-neutral-500 text-sm">Прокрути вниз для следующего вопроса</p>
            )}
          </div>
        )}
      </motion.div>
    </section>
  )
}

interface QuizResultProps {
  score: number
  total: number
  isActive: boolean
  onReset: () => void
}

export function QuizResult({ score, total, isActive, onReset }: QuizResultProps) {
  const percent = Math.round((score / total) * 100)
  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.p
        className="text-neutral-500 text-sm mb-4 uppercase tracking-widest"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4 }}
      >
        Результат
      </motion.p>
      <motion.h2
        className="text-5xl md:text-7xl font-bold text-white mb-4"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {score} из {total}
      </motion.h2>
      <motion.p
        className="text-neutral-400 text-xl mb-10"
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {percent >= 80
          ? "Отличный результат! Материал усвоен хорошо."
          : percent >= 60
          ? "Неплохо, но есть что повторить."
          : "Стоит ещё раз пройти материал."}
      </motion.p>
      <motion.div
        initial={isActive ? visible : hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
          onClick={onReset}
        >
          Пройти снова
        </Button>
      </motion.div>
    </section>
  )
}