using EPiServer.Core;

namespace $rootnamespace$.Models.Pages
{
    public interface IHasRelatedContent
    {
        ContentArea RelatedContentArea { get; }
    }
}
