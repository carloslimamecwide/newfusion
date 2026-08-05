import type { CSSProperties } from "react";

type AnimatedTextMode = "typing" | "words";

type AnimatedTextProps = {
  text: string;
  mode?: AnimatedTextMode;
  startDelay?: number;
  interval?: number;
};

type MotionStyle = CSSProperties & {
  "--text-delay": string;
};

const SPLIT_WHITESPACE = /(\s+)/;

export function AnimatedText({
  text,
  mode = "words",
  startDelay = 0,
  interval = mode === "typing" ? 20 : 45,
}: AnimatedTextProps) {
  const chunks = text.split(SPLIT_WHITESPACE);
  let characterIndex = 0;
  let wordIndex = 0;

  return (
    <span className={`animated-text animated-text-${mode}`}>
      {chunks.map((chunk, chunkIndex) => {
        if (/^\s+$/.test(chunk)) {
          return chunk;
        }

        if (mode === "words") {
          const index = wordIndex++;
          const style: MotionStyle = {
            "--text-delay": `${startDelay + index * interval}ms`,
          };

          return (
            <span className="animated-word-mask" style={style} key={`${chunk}-${chunkIndex}`}>
              <span className="animated-word-content">{chunk}</span>
            </span>
          );
        }

        return (
          <span className="animated-word" key={`${chunk}-${chunkIndex}`}>
            {Array.from(chunk).map((character, indexInWord) => {
              const index = characterIndex++;
              const style: MotionStyle = {
                "--text-delay": `${startDelay + index * interval}ms`,
              };

              return (
                <span
                  className="animated-character"
                  style={style}
                  key={`${character}-${indexInWord}`}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
