# Application Goals and Design


This document takes a quick overview of the goal, and how the application functions. This document takes the high level view of the design of the application and organization of the source in case you need to extend it.


## Background


This site framework is actually a result of a project that needed documentation site hosted in github, and the one that uses markdown documentation to be the base for the site pages. The module was abstracted away from the main repository to create a new project.


Many projects served from Github like hosts are pure HTML and did not benefit from the concept of an SPA along with the fact that reusing markdown files (most commonly used as project documentation's readme) would have been a big benefit. Most big projects used to move their documentation to a self hosted site or move to different documentation sites [Readthedocs](https://readthedocs.org/) or [Gitbook](https://www.gitbook.com/); for various reasons - one being reuse of markdown files. I have used, created, and worked with these tools before. They are good. Have a look at them. It worth your time to explore these options since they come with their own feature benefits.


However, since I needed the markdown documentation to be associated with my own github pages without the user leaving my site - this project was born. The site was abstracted into a seperate repository so that anyone could create their own documentation with markdown easily. More, they could host it even at places like github or HTML only supporting sites (without access to URL rewrites) and get the benefits of a single page application.


## Goal


Github like sites allow you to host HTML only pages to project your project work. You can view details in the [github pages](https://pages.github.com/). However, it allows for only simple HTML pages to work. Only snippets of UI components would work right but it leads to reloading of same static assets. The reason: most Single page applications need a UI or a component router to work with views / site pages but need a URL redirection in the server to the main HTML page.


This site framework allows you to work with a single page application like features but still run without URL rewrites options in server, or configuration access. A easy way of turning markdown readme files into a site with modern web capabilities using just configuration files.


## Design


The site framework is basically a simple angular component with a few services that allow you to display markdown content. The creation of this same component could have been achieved by use of vuejs, preact, or react. I chose Angular framework to due to ease of use of some patterns and some functionality that comes out of the box with Angular. However, the site does not use the default angular router due to need of support URL rewrite in the server, which is not allowed by github and lots of github like hosts.


The page / view transition is, however, mocked by changing the content display variables for the markdown rendering component. The data / content needed is fetched using a XHR get request to the github pages host and a URL mock change is associated to this. A link click triggered a XHR request, assign the content of the XHR response to the markdown rendering component. You can call it a minimalistic or barebone router that basically uses / captures a book mark as a pointer to reference a content.


There was another challenge. The first versions release did not support a link from within one markdown file to reference another markdown file. This was because the markdown rendering component did not add a click handler for any links within the markdown converted HTML. A tweak / alteration to the markdown link definition allowed to associate the link change to a hash change. Basically, a definition of internal markdown link `[someurl](#/someurl)` instead of this `[someurl](/someurl)` allowed changing the hash instead of page. This allowed capture of the hash change using a  eventlistener that could allow triggering of a XHR request function within a markdown file link based on hash value. This is a dirty hack but I am open to changing this, if someone can think of a better way.


On the other side, the links configuration (top, sidebar, footer) can all be specified with just .json configuration file.


## Structure


Here is a simple view of the structure/functioning of the application:


```html

<html>

<body>
    <application>
        <!-- Assignedvalue variable coming from application component -->
        <!-- Hash Value change listener -->
        <topnav>
                <links-notcustomcomponent>
                    <!-- Trigger XHR on click and assign content to Assignedvalue -->
                </links-notcustomcomponent>
        </topnav>

        <sidebar>
                <links-notcustomcomponent>
                    <!-- Trigger XHR on click and assign content to Assignedvalue -->
                </links-notcustomcomponent>
        </sidebar>

        <markdown-render [htmlcontent]="Assignedvalue">
                <markdownlinkshashbased-notcustomcomponent>
                    <!-- Trigger XHR on hash change and assign content to Assignedvalue -->
                </markdownlinkshashbased-notcustomcomponent>
        </markdown-render>

        <footer>
                <links-notcustomcomponent>
                    <!-- Trigger XHR on click and assign content to Assignedvalue -->
                </links-notcustomcomponent>
        </footer>
    </application>
</body>

</html>


```


## Offline Support


The application has PWA / Service workers support enabled and allows for basic offline viewing of the site. 


## Contribution / Requests / Issues


Note: This was a weekend project. If you have ideas, feature requests, improvements in application / code, removing code smell, and/or find bugs, you are welcome to raise a [github issue]() or a [pull request]().