using CsvHelper.Configuration;

public class SensorDataCsvMap: ClassMap<SensorDataCsvEntry>
{
    public SensorDataCsvMap()
    {
        Map(m => m.CounterReadingID).Name("CounterReadingID");
        Map(m => m.CounterID_ASTA).Name("CounterID_ASTA");
        Map(m => m.SequenceNumber).Name("SequenceNumber");
        Map(m => m.StartTime).Name("StartTime");
        Map(m => m.EndTime).Name("EndTime");
        Map(m => m.Visits).Name("Visits");
        Map(m => m.ASTA_Counters.CounterID_PAVE).Name("ASTA_Counters.CounterID_PAVE");
        Map(m => m.ASTA_Counters.Name_ASTA).Name("ASTA_Counters.Name_ASTA");
        Map(m => m.ASTA_Counters.InstallationDate).Name("ASTA_Counters.InstallationDate");
        Map(m => m.ASTA_Counters.NationalParkCode).Name("ASTA_Counters.NationalParkCode");
        Map(m => m.ASTA_Counters.Municipality).Name("ASTA_Counters.Municipality");
        Map(m => m.ASTA_Counters.RegionalUnit).Name("ASTA_Counters.RegionalUnit");
        Map(m => m.ASTA_Counters.RegionalEntity).Name("ASTA_Counters.RegionalEntity");
        Map(m => m.PAVE_Counters.Globalid).Name("PAVE_Counters.Globalid");
        Map(m => m.PAVE_Counters.Name).Name("PAVE_Counters.Name");
        Map(m => m.PAVE_Counters.Manager).Name("PAVE_Counters.Manager");
        Map(m => m.PAVE_Counters.AdditionalInfo).Name("PAVE_Counters.AdditionalInfo");
        Map(m => m.PAVE_Counters.CoordinateNorth).Name("PAVE_Counters.CoordinateNorth");
        Map(m => m.PAVE_Counters.CoordinateEast).Name("PAVE_Counters.CoordinateEast");
    }
}