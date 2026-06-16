export type MvpPillar = {
  title: string;
  description: string;
  status: "bereit" | "als nächstes" | "kommt später";
};

export type TrainingPreviewDay = {
  day: string;
  focus: string;
  model: string;
  duration: string;
};

export type ProductPrinciple = {
  title: string;
  description: string;
};
