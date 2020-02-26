// https://vuex.vuejs.org/en/state.html

export default {
  geolocation: [],
  sessionID: '',
  carsGeo: [],
  points: [],
  chooseCarToTrack: null,
  chooseTrackToChange: null,
  mapTracks: [],
  geozones: [],
  geozone: {
    name: '',
    id: null,
    isShow: false,
    controlPoints: {
      model: '',
      items: [],
    },
    routes: {
      model: '',
      items: [],
    },
    drivers: {
      model: '',
      items: [],
    },
  },
  geozoneTemplate: {
    name: '',
    isShow: false,
    controlPoints: {
      model: '',
      items: [],
    },
    routes: {
      model: '',
      items: [],
    },
    drivers: {
      model: '',
      items: [],
    },
  },
  classifiers: [
    {
      name: 'Виды регулярных перевозок',
      link: 'types_of_regular_transportation',
      headers: [
        {
          text: 'Имя',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Статусы',
      link: 'statuses',
      headers: [
        {
          text: 'Наименование',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Категории транспортных средств (ТС)',
      link: 'vehicle_categories',
      headers: [
        {
          text: 'Наименование категории',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Описание категории',
          align: 'left',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Класс ТС (вместимость)',
      link: 'vehicle_capacity_classes',
      headers: [
        {
          text: 'Наименование класса',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Описание класса',
          align: 'left',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Класс ТС (длина)',
      link: 'vehicle_length_classes',
      headers: [
        {
          text: 'Наименование класса',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Описание класса',
          align: 'left',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Маски регистрационных знаков ТС',
      link: 'registration_masks_of_vehicle_signs',
      headers: [
        {
          text: 'Наименование маски',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Формат маски',
          align: 'left',
          sortable: false,
          value: 'mask_format',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Типы документов',
      link: 'document_types',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование типа',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Муниципальные образования',
      link: 'municipal_objects',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Субъект РФ',
          align: 'left',
          sortable: false,
          value: 'subject',
        },
      ],
    },
    {
      name: 'Порядок посадки/выгрузки пассажиров',
      link: 'procedures_for_boarding_unboarding_passengers',
      headers: [
        {
          text: 'Наименование порядка посадки/выгрузки',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Наименование для отчетов',
          align: 'left',
          sortable: false,
          value: 'name_of_reports',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Тип точки',
      link: 'control_point_types',
      headers: [
        {
          text: 'Наименование типа',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Остановка (логический тип)',
          align: 'left',
          sortable: false,
          value: 'is_stop',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Типы маршрутов',
      link: 'route_types',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование типа',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Время пересадки, мин. (для МП)',
          align: 'left',
          sortable: false,
          value: 'transplant_time',
        },
        {
          text: 'Примечание',
          align: 'left',
          sortable: false,
          value: 'remark',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Типы ТС',
      link: 'vehicle_types',
      headers: [
        {
          text: 'Наименование типа',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Максимальная скорость',
          align: 'left',
          sortable: false,
          value: 'max_sapeed',
        },
        {
          text: 'Общественный транспорт',
          align: 'left',
          sortable: false,
          value: 'is_public_transport',
        },
        {
          text: 'Иконка',
          align: 'left',
          sortable: false,
          value: 'icon',
        },
        {
          text: 'Цвет ТС на карте',
          align: 'left',
          sortable: false,
          value: 'color',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Типы календаря',
      link: 'calendar_types',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование типа',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Экологический класс ТС',
      link: 'ecological_vehicle_classes',
      headers: [
        {
          text: 'Наименование класса',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Состав ТС',
      link: 'vehicle_classes',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование состава',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Часовые пояса',
      link: 'time_zones',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Имя',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'utc+',
          align: 'left',
          sortable: false,
          value: 'utc',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Типы объектов',
      link: 'object_types',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование объекта',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Признак остановочного пункта',
          align: 'left',
          sortable: false,
          value: 'is_stop',
        },
        {
          text: 'Опасный участок',
          align: 'left',
          sortable: false,
          value: 'is_dangerous',
        },
        {
          text: 'Иконка',
          align: 'left',
          sortable: false,
          value: 'icon',
        },
        {
          text: 'Отображать в слоях МП',
          align: 'left',
          sortable: false,
          value: 'display_in_mp_layers',
        },
        {
          text: 'Для МП (гостям города)',
          align: 'left',
          sortable: false,
          value: 'for_mp',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Сервисные стоянки',
      link: 'service_parkings',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Организационно-правовые формы',
      link: 'organizational_legal_forms',
      headers: [
        {
          text: 'Наименование',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Краткое наименование',
          align: 'left',
          sortable: false,
          value: 'short_name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Варианты контроля без движения',
      link: 'control_options_without_movements',
      headers: [
        {
          text: 'Код',
          align: 'left',
          sortable: false,
          value: 'code',
        },
        {
          text: 'Наименование',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
    {
      name: 'Марка ТС',
      link: 'vehicle_brands',
      headers: [
        {
          text: 'Наименование марки',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Норма расхода',
          align: 'left',
          sortable: false,
          value: 'consumption_rate',
        },
        {
          text: 'Дата начала учета',
          align: 'left',
          sortable: false,
          value: 'accounting_start_date',
        },
        {
          text: 'Дата окончания учета',
          align: 'left',
          sortable: false,
          value: 'accounting_end_date',
        },
      ],
    },
  ],
}
