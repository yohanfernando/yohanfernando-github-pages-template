@yohanfernando blog ([view](http://yohanfernando.github.io/))
==================


## About

This is the git repository for my personal blog hosted via GitHub Pages.  

I am creating this blog using Jekyll and planning to release a post on completion detailing the 
steps I went through which may help someone in future.  

### What did I do so far…

#### Phase 1 - Setup Jekyll base blog

Install all required software to get Jekyll up & running  

* **Ruby** (latest 2.2.2p95) via `brew install ruby`*  
* **Bundler** via `gem install bundler`
* **Jekyll** - you can install either via `gem install github-pages` or create an empty folder 
with below GemFile and run `bundle install` (NB to install github-pages, Xcode need 
to be installed on a Mac).  

    ```js
        source 'https://rubygems.org'   
        gem 'github-pages'  
    ```
  
Now create a base Jekyll site using `jekyll new <site-name>` and copy a version of the  above 
GemFile to the root of that project. This is a good time to initialise Git and add 
a README and LICENSE file to the project.


\* if you don’t use Homebrew I thoroughly recommend trying it out, refer 
[Homebrew Setup Guide](http://brew.sh/)


#### Phase 2 - Setup development environment  

First install npm & bower dependencies.  

* Set up Node as you need to access the npm package manager; a perfect opportunity 
to use `brew install node`. Once installed, create 'package.json' file at the root 
of your project folder.  
* Install bower for adding runtime dependencies via `npm install -g bower` (you can save it 
to your 'package.json' by running the `npm install --save-dev bower` command instead).  

When creating a blog or a basic site with Jekyll you don't need a build system such as 
gulp/grunt. However I thought it will be interesting to setup one to try them out, and 
to configure **browser-sync** or similar to assist my development workflow. 
I decided to use gulp as I have heard a lot of good things about it lately.

* To install gulp as builder tool, run `npm install --global gulp` (you can save it to 
your package.json by running the `npm install --save-dev gulp` command instead).
* Create a basic `gulpfile.js` at the root of your project folder, following is all 
what you need to start.  

    ```js
        var gulp = require('gulp');    
            
        gulp.task('default', function() {
            // place code for your default task here
        });
    ```

Now that we have completed the basic file setup, its a good time to add your personal details & 
information about the site & repositories to `package.json`, `bower.json` and `gulpfile.json` 
and customise them.
 

#### Phase 3 - Setup gulp, add basic info & temp articles for testing


Latest versions of Jekyll comes with a *'watch'* tool that compile the '.md' files and inject to 
the compiled Jekyll site ('_site') without needing a site rebuild each time you make an alteration 
to a blog article / markdown file. Unfortunately as it doesn't auto refresh the page (lazy ei!) 
and doesn't compile config file or static pages, I was motivated to install & configure **gulp** 
to use during the development.    

Although **gulp** is a brilliant build tool it needed to be configured to work with Jekyll & it's 
file structure. For this I had to first build the site using `jekyll build` via a 
gulp child process, then initiate a `gulp watch` on markdown, scss, html & config files, 
and depending on what got changed either inject the compiled files to the jekyll 
output folder ('_site') or rebuild the whole site.  

* First install following npm plugins to assist with the gulp setup  

    ```js
        npm install --save-dev gulp gulp-autoprefixer gulp-notify gulp-rename gulp-sass browser-sync  
    ```  

* As I am going to be using Zurb's Foundation framework in the project, install that using 
bower command `bower install foundation --save`  


* I then configured following **gulp** tasks, and when the `gulp serve` command is executed 
following will be executed in order specified below.

    a. `copy-libraries` - copy foundation & bower libraries to assets folder  
    b. `jekyll-build` - build the site using a child process  
    c. `watch` - specify which files to watch  
    d. `serve` - initiate browser-sync and open auto-refresh enabled web page  
    
    *Additionally I also have;*  
    e. `scss` - which will compile scss files on change and inject to _site/assets/css 
    folder ( **NB.**  I changed the path from default 'css/main.scss' to 'assets/css/style.scss')   
    f. `jekyll-rebuild` - which will call 'jekyll-build' task and reload browser-sync  
    g. `default` - which will call 'serve' task  
    

I also created a 'index-new.html' for designing the new layout for my blog and it is using 
the '_layouts/default-new.html'. The 'default-new' layout include the 'head-new.html' which 
has a link to the 'assets/css/style-new.css' which will be my new stylesheet for the blog
which uses foundation framework.  

**Note :** In order to test the site as you develop it is advisable to setup a few dummy 
posts with different types of components in them, which is what I did in the posts folder. 
  
  
  
**Now that I have my build environment setup, I can proceed to the development stage 
and if you use my repo, so can you.**
  
  
#### Phase 4 - Design, structure & style the layouts
    
This is where you pretty much translate the 'ideas' you have in mind to html & css. Due to build 
complexities with Jekyll, I highly recommend developing the layout using a static file and setup 
`gulp` to copy the files to the `_site` folder & refresh the page everytime you make a change. 

During this stage I simply created:  

 * layout for home page  
 * layout for single posts  
 * page to display all the blog articles (if someone visit `../blog/` url of the site)  
 
Once you complete hustling the pages, especially dreaded css, its time to create the layout based 
on that. Best thing to do is stick to the current `_layouts` and `_include` folder structure. 
Separate the html head section, the site header/navbar and the site footer in to different 
includes, and insert them via the layout. For the home page, main body of the page will 
remain in the index.html page and be inserted to the layout via `{{ content }}`. 

On the single page layouts the only thing that get copied via `{{ content }}` is the body of the 
blog post. Hence it is important to output the blog title, author, dates, share icons around the 
content. In both home and single post pages, it is nicer to display a few of the 'next' articles 
to attract visitors to read more.

The blog index page will simply output a list of all the articles in the same way the next 
articles were shown on home & single-post pages (pagination yet to be done!).

I also created `_include` templates which I can reuse throughout the site, for example 
to format date, display tags, show 'next' articles, add share icons etc and I highly recommend 
you do the same too. 
 
**Although you may use my template, it maybe worth adding a bit of your touch to make it 
fully yours.**  
  
  
  
  
### Interesting Reads

1. Setup Gulp browser sync to work with Jekyll 
build/site setup: https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
2. Introduction to Gulp: https://www.codefellows.org/blog/quick-intro-to-gulp-js

  
  
  
  
  
  
  
   