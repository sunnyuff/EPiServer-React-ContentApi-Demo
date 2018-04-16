using EPiServer.Core;

namespace EpiserverPOC.Models.Pages
{
    public interface IHasRelatedContent
    {
        ContentArea RelatedContentArea { get; }
    }
}
