import { ChangeEventHandler, useCallback, useState } from "react";

import { Container } from "@components/core/Container";
import { Icon } from "@components/core/Icon";
import { IconKey } from "@interfaces/icons";

type ChangeHandler = ChangeEventHandler<HTMLInputElement>;

export function Slider({
  updateValue = () => {},
  min = 0,
  max = 100,
  step = 1,
  defaultValue = (min + max) / 2,
  iconMin,
  iconMax,
}: {
  updateValue?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  iconMin?: IconKey;
  iconMax?: IconKey;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeHandler = useCallback((event) => {
    const newValue = event.target.valueAsNumber;
    setValue(newValue);
    updateValue(newValue);
  }, [updateValue]);

  return (
    <Container className="slider">
      {iconMin && <Icon icon={iconMin} />}
      
      <Container className="slider-main">
        <input
          type="range"
          className="slider-input"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onChange={handleChange}
          list={"slider-ticks"}
        />

        <Container className="slider-ticks">
          {[...Array(3)].map((_, index) => (
            <Container
              key={index}
              className="slider-tick"
            />
          ))}
        </Container>

        <Container className="slider-label-container">
          <div className="slider-label" style={{
            left: `${((value - min) / (max - min)) * 100}%`,
          }}>
            {value.toFixed(2)}x
          </div>
        </Container>
      </Container>
      
      {iconMax && <Icon icon={iconMax} />}
    </Container>
  );
}

