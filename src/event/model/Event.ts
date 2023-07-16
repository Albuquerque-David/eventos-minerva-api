class EventModel {
  id: string;
  image: string;
  name: string;
  description: string;
  local: string;
  date: Date;
  image: string;
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
