class EventModel {
  name: string;
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

export { EventModel };
