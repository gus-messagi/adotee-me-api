import IPet from '../@types/Pet';

interface filters {
  age?: any;
  health?: any;
  sex?: any;
  size?: any;
  type?: any;
}

export default function applyFilter (announcements: any[], filters: filters) {
  const ageFilter = announcements.filter(announcement => filters.age
    ? announcement.pets.map((pet: IPet) => pet.age === filters.age).includes(true) && announcement
    : announcement
  );

  const sexFilter = ageFilter.filter(announcement => filters.sex
    ? announcement.pets.map((pet: IPet) => pet.sex === filters.sex).includes(true) && announcement
    : announcement
  );

  const healthList = filters.health?.split(',');

  const healthFilter = sexFilter.filter(announcement => healthList?.length > 0
    ? announcement.pets.map((pet: IPet) =>
        healthList.map((health: string) =>
          !!pet.health?.includes(health.toString())).includes(true)).includes(true) && announcement
    : announcement
  );

  const typeFilter = healthFilter.filter(announcement => filters.type
    ? announcement.pets.map((pet: IPet) => pet.type === filters.type).includes(true) && announcement
    : announcement
  );

  const sizeFilter = typeFilter.filter(announcement => filters.size
    ? announcement.pets.map((pet: IPet) => pet.size === filters.size).includes(true) && announcement
    : announcement
  );

  const response = sizeFilter;

  return response;
}
