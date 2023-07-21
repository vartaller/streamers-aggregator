export type StreamSubmitFormProps = {
  streamerId: string;

  rootClassName?: string;
  textHeading?: string;
  textTitle?: string;
  textDescription?: string;
  textStartedAt?: string;
  textEndedAt?: string;
  textAverageViewers?: string;
  textGame?: string;

  valTitle?: string;
  valDescription?: string;
  valStartedAt?: Date;
  valEndedAt?: Date;
  valAverageViewers?: number;
  valGame?: string;
  fetchData: () => void;
};
