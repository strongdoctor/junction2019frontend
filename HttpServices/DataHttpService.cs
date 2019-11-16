using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class DataHttpService : IDataHttpService
{
    private readonly HttpClient _httpClient;
    public DataHttpService(HttpClient httpClient) {
        // Set up e.g. base-URL, access tokens etc here
        _httpClient = httpClient;
    }

    public async Task<string> getData()
    {
        // var response = await _httpClient.GetAsync("...");
        // var responseContents = await response.Content.ReadAsStringAsync();

        var r = new Random();

        var dummyData = new object[] {
            new {
                name = "place1",
                value = "place1val"
            },
            new {
                name = "place2",
                value = "place2val"
            }
        };

        return JsonSerializer.Serialize(dummyData);
    }
}