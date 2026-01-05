import { Container } from "@components/core/Container";
import { Slider } from "@components/core/Slider";

export function VerseOptions({
  active,
  updateSpeed = () => {},
}: {
  active: boolean;
  updateSpeed?: (value: number) => void;
}) {
  return (
    <Container className={[
      "verse-options",
      active ? "active" : "",
    ].join(" ")}>
      <Container className="verse-options-content">
        <Slider
          min={0.75}
          max={1.25}
          step={0.03125}
          defaultValue={1}
          updateValue={updateSpeed}
        />
      </Container>
    </Container>
  );
}

