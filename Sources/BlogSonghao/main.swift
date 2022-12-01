import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct BlogSonghao: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case posts
    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    // Update these properties to configure your website:
    var url = URL(string: "https://a1am0.github.io/")!
    var name = "A1aM0"
    var description = "A description of BlogSonghao"
    var language: Language { .chinese }
    var imagePath: Path? { nil }
}

// This will generate your website using the built-in Foundation theme:
// try BlogSonghao().publish(
//     using: [
//         .unwrap(.gitHub("A1aM0/a1am0.github.io", branch: "main", useSSH: true), PublishingStep.deploy)
//     ]
// )
try BlogSonghao().publish(withTheme: .foundation)