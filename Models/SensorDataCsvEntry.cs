using System;

public class SensorDataCsvEntry {
    public int CounterReadingID {get;set;}

    public int CounterID_ASTA {get;set;}

    public string SequenceNumber {get;set;}

    public DateTime StartTime {get;set;}

    public DateTime EndTime {get;set;}

    public int Visits {get;set;}

    public ASTA_Counters  ASTA_Counters {get;set;}

    public PAVE_Counters PAVE_Counters {get;set;}
}

public class ASTA_Counters {
    public string CounterID_PAVE {get;set;}
    public string Name_ASTA {get;set;}
    public string InstallationDate {get;set;}

    public string NationalParkCode {get;set;}
    public string Municipality {get;set;}
    public string RegionalUnit {get;set;}

    public string RegionalEntity {get;set;}
}

public class PAVE_Counters {
    public string Globalid {get;set;}
    public string Name {get;set;}
    public string Manager {get;set;}
    public string AdditionalInfo {get;set;}
    public string CoordinateNorth {get;set;}
    public string CoordinateEast {get;set;}
}