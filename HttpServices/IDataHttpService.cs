using System.Threading.Tasks;

public interface IDataHttpService
{
    Task<string> getData();
}