class EventCreateInput {
  name: string;
  description: string;
  local: string;
  date: Date;
  category: string;
  schedule: [
    {
      name: string;
      hour: Date;
      description: string;
    },
  ];
}

export { EventCreateInput };
