# How To Import Contacts To HubSpot CRM From A Spreadsheet (Google Or Excel)

- Getting your team off of spreadsheets

and onto CRM is a huge first step,

but it is only the first step.

What's goin' on everybody?

It's your dude, Devyn,

and today I'm gonna show you

how to bring contacts into HubSpot.

And I'm not just talkin' about one by one.

We're talkin' all of your
spreadsheet into HubSpot at once.

Before we get started, few
things to keep in mind,

as a wise uncle once said,

"With great power comes
great responsibility."

This is a very powerful tool,

and it's very tempting to
abuse, but don't do it.

First thing you don't want
to do is import cold lists.

You don't want to bring
in something that's old

where you can have old
names, old email addresses,

because what can happen is

you can send emails to these
people, they no longer exist,

(buzzer buzzing)

completely ruin your email deliverability.

Also, you don't wanna import bot lists.

You don't even wanna buy lists.

You wanna only bring in
people who have opted in,

people who know that they're
going to hear from you.

Be a good person.

Next thing, is keep your data clean.

Remember that garbage
in means garbage out.

There's no need to have
a messed up spreadsheet

and try and figure it out later

when you can clean up
your spreadsheet first.

Well, let's actually talk about

how to prep your spreadsheet.

So this is an example
of a good spreadsheet.

Perfect for HubSpot import,

has a first name, last name, email.

The three most important
things that you're gonna need

if you plan on importing.

We've also got phone numbers,
and we have the company field.

Now what we're gonna do

is we're gonna leave
the company field out,

but instead of deleting
it outta the spreadsheet

we're just not gonna
import it into the system.

Show you how to do that later.

But let's say you have a spreadsheet

that doesn't have first name, last name.

Has the entire name in the same field.

Easy way to fix this is to
take this field, select it,

we're gonna do the whole column

and go to Split text into columns.

And we're gonna go down
here and select Space,

and that's it.

Now we have your first
name and last name split,

and you're ready for a
clean import to HubSpot.

Speaking of which, let's
go ahead and get started.

Right now in HubSpot, what you wanna do

is go to Contacts and
then select Contacts,

and right over here in the
upper-hand corner is Import.

So we have a couple
different options here.

You have start an Import or Sync.

Sync is very powerful.

Sync is great if you want
to connect to a legacy CRM

or if you're using something older

like a different marketing
automation tool or email tool.

You can connect directly to it

and bring all your data right over.

But for this case, we're gonna
go with starting an import.

So here we have three different options.

We can repeat a past import,

and we'll use that as a
template for the new import,

but that's not what we're doing today.

You can import an opt-out list.

This one is extremely important.

You wanna make sure that the
people who have opted out

in your previous email marketing
tools or your previous CRM

don't accidentally get emails
sent to them from this one.

So we're gonna make sure that
we're importing clean lists,

but in this case, we're going to be

importing a file from the computer.

So we can import multiple
files with associations,

or we can import one file.

Multiple files is something you can do

but it's really a tool for advanced users.

It's not something that I would recommend

if you're just getting
started out with HubSpot.

So we're gonna go ahead
and select One file.

Now, one object or multiple objects.

This one can be kind of tricky,

Technically, technically we could use

our existing spreadsheet
to import multiple objects,

but we're not gonna do that today.

Now if you're curious
about what objects are,

let's go and select One
object and go to Next,

and we can break it down.

Objects within HubSpot are Companies,

Contacts, Deals, Products,
Shipments, Tickets,

but you can also import Activities,

like Calls, Emails,
Meetings, Notes, Tasks.

All of these are able to be imported

into HubSpot from a spreadsheet.

But what we're doing today
is importing Contacts.

So the next thing we're
gonna do is to choose our,

in this case, CSV.

And now we have the options

of how we want to import these contacts.

We can Create and Update Contacts,

Create new Contacts only,
or Update existing Contacts.

The reason why this is important

is because you might have to import

from multiple data sources,

but if you've ever worked
with numerous systems

you know typically only one of
'em is your source of truth.

So you wanna make sure

that whatever it is that you're importing,

first, is your source of truth.

And if you need to add data to that,

but don't wanna corrupt
your existing data,

that's when you start
relying on whether or not

to only add new names or only
update the existing names,

so that way you're not messing
anything up in your CRM.

Like I said before,
garbage in, garbage out,

and we wanna make sure
our data comes in clean.

But in this case, since
it's gonna be our first one,

we're gonna go ahead and select
Create and Update Contacts.

Now you can see here it's scanning

for some of your common errors,

and it said it didn't find any.

That's great news, but if it does,

it'll let you do something about it.

We'll talk about that a little later.

But first, let's look
at what we wanna import.

So we're can import
our Contact properties.

We can use our Record ID,

which is something if we're
using a unique identifier

to make sure that we
don't want to duplicate,

we don't have to worry about today.

Or you can select Don't import column.

We are gonna be using that today.

We're gonna be doing Contact properties.

We know that this is the First Name field.

We know that this is the Last Name field.

And if we look we can see
it's already selected Emails,

it's already selected Phone Number,

and we are not going to
import the company names,

even though there already
is a space for it.

So what we'll do is we'll
select Don't import.

Now we've identified everything.

However, let's say that this column

doesn't have a property that
we wanna associate with it.

What we can do is we can
Create a new property.

Creating new properties
can be very tempting.

What we don't wanna do is
completely inundate your system

with new properties,

especially properties that
you might never use again.

We don't necessarily need to import

all of the data that
comes in from the system.

What I'd recommend is
taking a moment to think

before you create new properties.

Ask yourself does this data
really need to be in the CRM?

Do I really need to know
this about this person?

Is it relevant?

Or is there already a property that exists

that I can use to put this in?

In this case, we're not
gonna create a new one.

So what we're gonna do is we
are gonna go over to Cancel,

and we're going to make sure that we

do not import this column.

And as you can see, now
everything's clear, we can hit Next.

And we can name this import.

And so I highly recommend
naming your imports,

not just going off of the file name,

so we can go back and find 'em later.

So we can do Full Crm List,

and we can put in the date here.

The reason why I'm selecting
Create a list from this import

is because maybe you want to go back

and just use the names that
came in off the spreadsheet

for a targeted email,

or maybe you wanna
enroll them in a workflow

and I wanna be able to
easily access them later.

This is how you do it.

And, of course, the all important,

"I agree that all contacts in this import

"are expecting to hear
from my organization."

Now that I've clicked Finish,

you can see that the import is processing.

It's gonna let me know
when the import is done.

So we can sit back,
relax, do other things,

or we can see how this was in.

Okay, so we see that
there were some errors.

It went to import 511 rows,

but it only added 30 new records.

Something must be wrong.

And the error is in the email

there was duplicate IDs.

So we can click on that

and it'll give us more
information on what that means.

Once you read through it,

you can see what errors it
was giving, how to fix it,

and you can even download
the errors as a CSV

so you can correct it manually.

Simple as that.

I happen to know that there
were duplicates in this.

I kinda did it on purpose, just
so you can see how it works.

And that's it.

You're all done.

Uploading from spreadsheets
is a huge time saver.

It can be tempting to rush
through it and fix it later,

but what you really wanna do

is make sure your data's
clean before you put it in.

Remember, be responsible.

Don't get into bad
habits doing bad things.

Before you go, be sure
to click the link below

and try HubSpot for free today.

That's it for me, everybody.

Hope to talk to you soon.

Until then, take it easy.