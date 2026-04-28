import { Button } from "@/components/ui/button"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, showButton, buttonText, onButtonClick }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && <div className="mb-12">{subtitle}</div>}
      <h2 className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
        {title}
      </h2>
      {content && (
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400">
          {content}
        </p>
      )}
      {showButton && (
        <div className="mt-12 md:mt-16">
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </section>
  )
}
