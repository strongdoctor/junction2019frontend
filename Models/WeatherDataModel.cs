using static Junction2019.Controllers.DataController;

public class WeatherDataModel
{
    public double snowDepth { get; set; }
    public double windSpeed { get; set; }
    public double temperature { get; set; }
    public double rainIntensity { get; set; }
    public Cloudiness cloudiness { get; set; }
}