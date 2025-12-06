import Image from "next/image"

export function Footer() {
  return (
    <section>
      <Image
        src="/9.png"
        alt="Footer"
        fill
        priority
        className="object-cover -z-10"
      />
    </section>
  )
}
