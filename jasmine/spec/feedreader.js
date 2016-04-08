/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* Thes to make sure that the allFeeds variable 
		* has been defined and that it is not empty.
		*/
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Test loops through each feed in the allFeeds object and
		* ensures it has a URL defined and that the URL is not empty.
		*/
		it('have URLs', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});


		/* Testloops through each feed in the allFeeds object 
		* and ensures it has a name defined and that the name 
		* is not empty.
		*/
		it('have Names', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
    });

	describe('The menu', function() {
		/* Tests if the menu element is hidden by default.*/
		it('is hidden', function() {
			expect($('body').attr("class")).toBe('menu-hidden');
		});

		/* Tests if menu changes visibility to visible 
		* when the menu icon is clicked. 
		* And if menu is hidden when clicked again.
		*/
		it('is showing and hiding', function() {
			expect($('body').toggleClass('menu-hidden').attr("class")).not.toBe('menu-hidden');
			expect($('body').toggleClass('menu-hidden').attr("class")).toBe('menu-hidden');
		});
	});

	describe('Initial Entries', function() {
		/* Test if when the loadFeed function is called and completes its work, 
		* there is at least a single .entry element within the .feed container.
		*/
		beforeEach(function(done) {
			loadFeed(0, function() { 
				done(); 
			});   
		});

		it('should get feed from net', function(done) {
			expect($('.feed').find('.entry').length).not.toBe(0);
			done();
		});
	});

	describe('New Feed Selection', function() {
		/* Tests if that when a new feed is loaded by the
		* loadFeed function that the content actually changes.
		*/  
		var html1;
		var html2;
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				html1 = $('.feed').html();
				loadFeed(1, function() {
					html2 = $('.feed').html();
					done(); 
				}); 
			}); 
		});

		it('should not be empty', function(done) {
			expect(html1).not.toBe(html2);
			done();
		});
	});
      
}());
