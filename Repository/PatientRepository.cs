using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HospitalManagement
{
    public class PatientRepository
    {
        public List<Patient> Patients { get; set; }
        public IOrderedEnumerable<Patient> FetchAll()
        {
            var myJsonString = File.ReadAllText("PatientData.json");
            var patientList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Patient>>(myJsonString);
            return patientList.OrderBy(o => o.PatientID);
        }

        public Patient Insert(Patient patient)
        {
            var filePath = @"PatientData.json";
            // Read existing json data
            var jsonData = System.IO.File.ReadAllText(filePath);
            // De-serialize to object or create new list
            var patientList = JsonConvert.DeserializeObject<List<Patient>>(jsonData)
                                  ?? new List<Patient>();

            if (string.IsNullOrEmpty(patient.PatientID))
            {
                var newPatientId = GenertePatientId(patientList);
                patient.PatientID = newPatientId;
            }
            else
            {
                //if it is update request remove the specific patient from list 
                patientList.RemoveAll(p => p.PatientID == patient.PatientID);
            }

            patientList.Add(patient);

            // Update json data string
            jsonData = JsonConvert.SerializeObject(patientList);
            System.IO.File.WriteAllText(filePath, jsonData);
            return patient;
        }

        public Patient Update(Patient patient)
        {
            var res = Patients.FirstOrDefault(x => x.PatientID == patient.PatientID);
            if (res != null) res = patient;
            return patient;
        }

        private string GenertePatientId(List<Patient> patients)
        {
            var patient = patients.OrderBy(o => o.PatientID).LastOrDefault();
            if (patient != null)
            {
                int id = Convert.ToInt16(patient.PatientID.Remove(0, 1));
                id++;
                return $"P{id}";
            }
            else
            {
                return "P12345";
            }
        }
    }
}
