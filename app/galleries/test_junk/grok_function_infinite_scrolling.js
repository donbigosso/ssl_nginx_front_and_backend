/**
 * Universal Infinite Scroller (API page-by-page version)
 *
 * @param {Object} options
 * @param {number}   [options.pageSize=20]
 * @param {Function} options.fetchPage     - async (page, pageSize) => Promise<{items: Array, hasMore: boolean}>
 * @param {Function} options.createWrapper - () => HTMLElement
 * @param {Function} options.createItem    - (item) => HTMLElement
 * @param {HTMLElement} options.target     - Where to put the wrapper
 * @param {string}   [options.sentinelId="infinite-scroll-sentinel"]
 * @param {string}   [options.rootMargin="200px"]
 */
function createInfiniteScroller({
  pageSize = 20,
  fetchPage,
  createWrapper,
  createItem,
  target,
  sentinelId = "infinite-scroll-sentinel",
  rootMargin = "200px"
}) {
  let currentPage = 1;
  let isLoading = false;
  let hasMore = true;
  let observer = null;

  // 1. Create the wrapper once (pure DOM)
  const wrapper = createWrapper();
  target.appendChild(wrapper);

  // 2. Create the invisible sentinel (pure DOM)
  let sentinel = document.getElementById(sentinelId);
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.id = sentinelId;
    sentinel.style.height = "1px";
    target.appendChild(sentinel);
  }

  // 3. Load next page from API
  async function loadNextPage() {
    if (isLoading || !hasMore) return;

    isLoading = true;

    try {
      const result = await fetchPage(currentPage, pageSize);
      const items = result.items || [];

      // Append new items
      items.forEach(item => {
        const element = createItem(item);
        wrapper.appendChild(element);
      });

      // Update state
      hasMore = Boolean(result.hasMore) && items.length > 0;
      if (items.length > 0) {
        currentPage += 1;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Infinite scroller error:", err);
      hasMore = false;
    } finally {
      isLoading = false;
    }
  }

  // 4. Setup scroll watcher
  function setupObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: 0
      }
    );

    observer.observe(sentinel);
  }

  // 5. Public API
  return {
    async start() {
      // First page
      await loadNextPage();
      setupObserver();
    },

    async reset() {
      currentPage = 1;
      hasMore = true;
      isLoading = false;
      wrapper.innerHTML = "";          // clear previous items
      await this.start();
    },

    destroy() {
      if (observer) observer.disconnect();
      wrapper.remove();
      if (sentinel.parentNode) sentinel.remove();
    }
  };
}