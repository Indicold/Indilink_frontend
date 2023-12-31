// Function to get the days in the month of the year
// by passing the month (1-12) and year to the function daysInMonth.
function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

// Define an initial payload with default values for form data
export let payload = {
    city_id: "14",
    address: "FARIDABAD",
    total_tonnage: "23",
    store_type_id: "3",
    cold_storage_type_id: "1",
    no_of_chambers: "34",
    ante_room_area: "347",
    total_number_of_docks: "5",
    total_office_space: "566",
    type_of_dock_id: "2",
    processing_area: "6565",
    parking_area: "566",
    type_of_refrigeration_id: "3",
    installation_year: "2023",
    facility_manager_name: "AMRIT",
    facility_manager_contact: "8287059939",
    internet: "true",
    wifi: "true",
    cctv: "true",
    driver_area_food_resting: "true",
    weight_bridge_id: "2",
    road_condition_id: "1",
    asset_id: localStorage.getItem('assets_list_id'),
    ca_equipment_ids: [3],
    compressor_ids: [2],
    acu_ids: [2],
    condensor_ids: [2],
    amc_ids: [1],
    iot_devices_ids: [1, 2, 5],
    it_devices_ids: [1],
    generator_ids: [1],
    mhe_ids: [1],
    solar_invertor_ids: [1],
    chamber_ids: [3],
};

// Define an empty payload with default values for form data
export let payload1 = {
    chamber_ids: [],
    weight_bridge_id: "",
    city_id: "",
    address: "",
    total_tonnage: "",
    store_type_id: "",
    cold_storage_type_id: "",
    no_of_chambers: "0",
    ante_room_area: "",
    total_number_of_docks: "",
    total_office_space: "",
    type_of_dock_id: "",
    processing_area: "",
    parking_area: "",
    type_of_refrigeration_id: "",
    installation_year: "",
    facility_manager_name: "",
    facility_manager_contact: "",
    internet: "",
    wifi: "",
    cctv: "",
    driver_area_food_resting: "",
    road_condition_id: "",
    ca_equipment_ids: [],
    compressor_ids: [],
    acu_ids: [],
    condensor_ids: [],
    amc_ids: [],
    iot_devices_ids: [],
    it_devices_ids: [],
    generator_ids: [],
    mhe_ids: [],
    solar_invertor_ids: [],
    asset_id: ""
};

// Define an initial CustomerMovePayload with default values for form data
export let CustomerMovePayload = {
    origin_country_id: 101,
    origin_city_id: 5211,
    origin_pincode: "221305",
    origin_gps: "",
    dest_country_id: 101,
    dest_city_id: 5211,
    dest_pincode: "221305",
    dest_gps: "",
    load_quantity_id: 1,
    broad_category_id: 1,
    product_type_id: 1,
    unit_id:1,
    dispatch_date: "",
    arrival_date: ""
};

var currentFullDate = new Date();
var month: any = currentFullDate.getMonth()+1;
var year = currentFullDate.getFullYear();
var dateExpected: any = currentFullDate.getDate() + 14;

if(dateExpected > daysInMonth(month, year)){
    dateExpected -= daysInMonth(month, year);
    month += 1;
    if(month == 13){
        month = 1;
    }
    
    if(month < 10){
        month = `0${month}`
    }
    
    if(dateExpected < 10){
        dateExpected = `0${dateExpected}`
    }
}
// Define an empty payload with default values for form data
export let CustomerMovePayload1 = {
    origin_country_id: '',
    origin_city_id: '',
    origin_pincode: '',
    origin_gps: '',
    dest_country_id:'',
    dest_city_id: '',
    dest_pincode: '',
    dest_gps: '',
    unit_id:2,
    load_quantity: '',
    broad_category_id: '',
    product_type_id: '',
    dispatch_date: `${year}-${currentFullDate.getMonth()+1}-${currentFullDate.getDate()}`,
    arrival_date: ''
}

export let CustomerPrepare={
    product_category_id: 1,
    broad_category_id: 2,
    product_type_id: 2,
    service_category_id: 2,
    country_id: 101,
    state_id: 101,
    city_id: 5211,
    throughput: 50,
    throughput_unit_id: 1,
    case_size: 1,
    case_size_unit_id: 1,
    estimated_docks: 1,
    estimated_dispatch: 5,
    temp_min: 5,
    temp_max: 10,
    temp_unit_id: 1,
    date_of_start: "2023-10-20"
  };

  export let CustomerPrepare1={
    product_category_id: '',
    broad_category_id: '',
    product_type_id: '',
    service_category_id: '',
    country_id: '',
    state_id: '',
    city_id:'',
    throughput:'',
    throughput_unit_id: '',
    case_size: '',
    case_size_unit_id: '',
    estimated_docks: 2,
    estimated_dispatch: 2,
    temp_min: '',
    temp_max: '',
    temp_unit_id: 1,
    date_of_start:`${year}-${month}-${dateExpected}`
  }