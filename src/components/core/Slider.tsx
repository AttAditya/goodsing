import { Container } from "@components/core/Container";
import { Icon } from "@components/core/Icon";

export function Slider({
  updateValue = () => {},
  min = 0,
  max = 100,
  step = 1,
  defaultValue = (min + max) / 2,
}: {
  updateValue?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}) {
  return (
    <Container className="slider">
      <Icon icon="Turtle" />
      
      <input
        type="range"
        className="slider-input"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onChange={(event) => updateValue(event.target.valueAsNumber)}
      />
      
      <Icon icon="Rabbit" />
    </Container>
  );
}

