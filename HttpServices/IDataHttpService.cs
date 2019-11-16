using System;
using System.Threading.Tasks;

public interface IDataHttpService
{
    Task<string> getData();
    Task<string> getRemoteData(int sensorId, DateTime date, WeatherDataModel model);
}