// src/ehr_icp_backend/src/lib.rs

use candid::{CandidType, Deserialize, Principal};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone, Debug)]
struct MedicalRecord {
    name: String,
    dob: String,
    gender: String,
    blood_group: String,
    contact: String,
    allergies: Vec<String>,
    chronic_conditions: Vec<String>,
    medications: Vec<String>,
    visits: Vec<String>,
}

thread_local! {
    static RECORDS: RefCell<HashMap<Principal, MedicalRecord>> = RefCell::new(HashMap::new());
}

#[ic_cdk::query]
fn get_record() -> Option<MedicalRecord> {
    let caller = ic_cdk::caller();
    RECORDS.with(|records| records.borrow().get(&caller).cloned())
}

#[ic_cdk::update]
fn set_record(record: MedicalRecord) {
    let caller = ic_cdk::caller();
    RECORDS.with(|records| records.borrow_mut().insert(caller, record));
}

#[ic_cdk::init]
fn init() {
    ic_cdk::print("EHR ICP backend initialized.");
}
