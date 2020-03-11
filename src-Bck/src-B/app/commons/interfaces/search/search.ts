/**
 * 
 * 
 * @export
 * @interface Search
 */
export interface Search {
}

/**
 * 
 * 
 * @export
 * @interface SearchResult
 */
export interface SearchResult {
    action: string;
    result: any;
}

/**
 * 
 * 
 * @export
 * @interface SearchRequest
 */
export interface SearchRequest {
    action: string;
    key: string;
    type: string;
    urls: string[];
}

export interface KeywordItem {
    key: string;
    weight: number
}

/**
 *
 *
 * @export
 * @interface KeywordsSearchItems
 */
export interface KeywordsSearchItems {
    url: string;
    keywords: KeywordItem[] | null;
}