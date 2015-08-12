@yohanfernando blog ([view](http://yohanfernando.github.io/))
==================


## About

This is the git repository for my personal blog hosted via GitHub Pages. 

I am creating the blog using Jekyll and planning to release a blog post on completion detailing the steps I went through which may help some soul in future.

### What I did so far…

1. Installed all required software
  1. **Ruby** (latest 2.2.2p95) via `brew install ruby`* 
  2. **Bundler** via `gem install bundler`
  3. **Jekyll** - you can install either via `gem install github-pages` or create a folder with below GemFile and run `bundle install` (NB to install github-pages, Xcode need to be installed on Mac).
  
    ```
	  source 'https://rubygems.org'
	  gem 'github-pages'
    ```
2. Created a base Jekyll site using `jekyll new <site-name>` and added the GemFile as above.
3. Initialised  Git, added README and LICENSE and committed the base structure.


\* if you don’t use Homebrew I thoroughly recommend trying it out, refer [Homebrew Setup Guide](http://brew.sh/)


