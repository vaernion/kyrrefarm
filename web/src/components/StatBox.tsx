import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export const StatBox = ({
  label,
  number,
  unit,
  toFixed,
  colorize,
  helpText,
  arrow,
}: {
  label: string;
  number: string | number;
  unit?: string;
  toFixed?: number;
  colorize?: boolean;
  helpText?: string;
  arrow?: { value: number | string; since: string; unit?: string };
}) => (
  <Stat mb={4}>
    <StatLabel>{label}</StatLabel>
    <StatNumber
      color={colorize ? (Number(number) > 0 ? "green" : "red") : undefined}
    >
      {toFixed ? Number(number).toFixed(toFixed) : number}
      {unit}
    </StatNumber>
    {helpText ? <StatHelpText>{helpText}</StatHelpText> : null}
    {arrow ? (
      <StatHelpText>
        <StatArrow type={arrow.value > 0 ? "increase" : "decrease"} />
        {arrow.value}
        {arrow.unit} since {arrow.since}
      </StatHelpText>
    ) : null}
  </Stat>
);
