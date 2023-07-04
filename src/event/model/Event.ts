class EventModel {
    name: string;
    local: string;
    date: Date;
    category: string;
    image: Blob;
    schedule: [{
        name: string,
        hour: Date,
        description: string,
    }]
}
  
export { EventModel };