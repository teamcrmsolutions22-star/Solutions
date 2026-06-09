# HubSpot Workflows: The COMPLETE Guide (2024)

- Hi, I am Adriti from HubSpot

and I'm here to talk all things Workflows.

Now, if you have a Pro or
Enterprise HubSpot account,

follow along with me.

But if you're new to HubSpot, no worries.

Simply sign up for HubSpot CRM

and see if HubSpot's right for you.

But for now, let's get to work.

In your navigation,

go over to Automations
and select Workflows.

Now here is your Workflow dashboard.

This is gonna be all of your workflows

and you can even filter
them by all of them.

Ones that are deleted, ones that HubSpot

has deemed that needs
a little bit of review

and ones that aren't being used.

So make sure to look at these

once you've created quite a few.

But to start, let's go into the top right

and click Create Workflow.

Now you have two options here.

You can either create Workflows

from scratch or from templates.

If you're just starting
out at highly recommend

looking at the templates
to get inspiration from

and see if there's any in there

that you could quickly
implement into your processes.

For today though, we're gonna
start with from scratch.

Now, on the left hand side,

you'll notice the HubSpot objects
that can start a Workflow.

So we have contacts,
companies, deals, et cetera.

Now, in order to choose one,

think of how you want
your Workflow to start.

Is it based on a change
in the contact property

or is it based on if a deal
moves to a certain stage?

That'll tell you which one to start with.

Now there are a couple
caveats I wanna mention.

So while Workflows is for
Pro and Enterprise users,

there are a couple here
that are specifically

for a certain user.

So ticket based and
feedback submission based.

These are only for service
Hub, Pro and Enterprise users.

And quote based is only for our sales

Hub Pro and Enterprise users

for custom object reporting,

only Enterprise users
have access to those.

Now for today, I wanna create a Workflow

that I think everyone should have,

which is sending an email

right after someone submits a form.

So I'm gonna start with contact based

and I'm gonna start with a blank workflow.

You can either start with a scheduled,

specific date or contact
date property workflow.

And these are more for if
there is a specific date

you are working around.

Let's say there's a webinar

that you want this Workflow
to send emails for it.

Well, you can start it at a specific date

so that it is targeted to that webinar.

On the top right, click next.

And the first thing that
we should be doing here

is giving the workflow a name.

This is such an easy step to skip,

but I highly encourage

making sure every Workflow has a name.

So this is gonna our
form submission Workflow,

and I'm just gonna put one
there and I'll click save.

All right, so the first thing

that I'm gonna do is set up my trigger.

Now I want anyone who
fills out a specific form

to get an email from me.

So I'm gonna click when an event occurs.

You can also make a Workflow
based on specific criteria

for contact properties or
even based on a schedule

like every Monday at 8:30 AM

I want to send an email to so and so.

So I'm gonna click when an event occurs

and the category will be form submission

and I want it based on a
specific form and name,

which is my new registration form.

All right, make sure
you click done and save.

So right here it says

"Everyone who has completed this form

will be enrolled in this Workflow."

Now I also wanna talk about re-enrollment.

So right here it says,

"Context won't re-enroll
into this Workflow."

What that means is if
someone submits this form

more than one time, they'll
only be in this Workflow once.

But if I don't want that to happen,

I want them to get an
email every single time

they submit the form, I can say yes,

re-enroll every time the trigger occurs,

but for now I don't want that to happen.

So everything looks good here.

Now the next step is to add

what I want to happen to these folks.

So I wanna send a communication to them

in the form of an email.

I am going to set up the
nurture to consideration email.

HubSpot gives me a quick email
preview, looks good to me,

and I can also send it to
only the enrolled contact

or all contacts associated

with the enrolled contact as well.

Just wanna do that one contact for now.

I'm gonna click save and I
could feasibly stop there

and have a pretty robust Workflow
that's gonna help me out.

However, this tool is
pretty sophisticated.

So let's see what else I can do.

Let's click this plus button

and I'm actually gonna add a delay.

So many times I get
bombarded with emails right

after I fill out a form,

but I actually want to
set a three day delay

between my first and second action.

So I'm gonna add a delay here,

and then I also wanna
add an if/then branch.

If/then branches make it easy
for me to divide my contacts

based on certain properties.

So for this example, I
wanna divide my contacts

based on where they live

and that will determine their next steps.

So I'm gonna actually base
it on a single property value

and that value is going
to be their country.

I'm gonna click next.

Now, my first branch I want to,

so now my first branch

is going to be all folks in North America

and my second will be other.

So what I'm essentially doing here

is everyone who has filled out the form,

I wanna know if they are
either in North America

or anywhere else in the world.

So I'm gonna click save, and here it is.

So now after three days,

HubSpot is going to divide the folks up.

And for people in North America,

I actually want to send them another email

with this email.

And for people not in North America,

I actually wanna follow up
with them via phone call.

So I'm gonna create a task
to call form submitters,

and I'm going to assign the task

to the owner of the contact.

So now people in North America

will get another email three days later,

and people who are not in North America

will actually get a
phone call from someone

since we set up the task here.

Something that I like
to do before I'm done

is actually make the
screen a little smaller

so I can see my Workflow

and make sure that it's
exactly what I want.

All right, so this looks good to me.

I'm gonna pop over to
settings and notifications.

Now there are two things
that I can do here.

I can set a specific time
for actions to execute.

So let's say I'm working only
in North America time zones.

I can make sure that all emails are sent

within working hours, or I can
just do it whenever I want.

For now I'm gonna say anytime.

I can also add this to a
specific marketing campaign

so I can track and manage and report

on these emails under
that specific campaign,

but this is gonna be a
one-off, so I don't need that.

Next step is goals.

So you can actually set a goal

to see how your Workflow is performing

against what your goal is.

So for this specific goal,

I want people to be able to book meetings.

So under activity properties,

I'm gonna say meeting outcome
is any of the schedules,

and once I apply that filter,

I'll be able to see my
goal in the percentage I am

to my goal.

In changes, I can just see
a history of all the folks

that have worked this Workflow.

All right, so I know that
this can be intimidating,

but don't worry, you can always
test your Workflow first.

So enroll yourself in the Workflow,

make sure it works exactly as you want

before you review and publish it.

Now, if you go back to
your Workflow homepage,

you can hover over your Workflow,

click more and select view details.

Here you'll be able to see
all of your contacts enrolled,

enrollment over time,
the contact performance

and other metrics
associated with your goals.

If you're enjoying this Workflow content,

make sure you subscribe
to this YouTube channel.

Another thing I wanna mention

is just because you've
published a Workflow

doesn't mean you can't go in
there and change it if needed.

You can always come in
here, click edit actions,

and edit what you need to do.

Now, something that I wanna talk about

is some small things that HubSpot does

that actually make your life a lot easier

when it comes to Workflows.

And the first is Workflow alerts.

So if you click into a
Workflow that's been running

on the top left, you'll
notice an alerts button.

If I click into this,

I'll actually be able to
see all of the mistakes

or the errors that have
happened in this Workflow.

So for example, there are
a couple of times here

where the WhatsApp message
actually didn't go through,

and if I wanna know more about it,

I can click into this and
I can see the exact reason

for the error.

So for this one,

the contact doesn't have
a WhatsApp phone number.

That makes sense why HubSpot
flagged it as an error.

So to me that's a signal that,

hey, maybe this contact
gave me a wrong number.

I need to go back in there

and clean up my data a little bit.

Next, if you hit settings
and notifications,

there are a couple of
things that you can do here.

One, you can set the time
that the actions execute.

So if you don't really
mind the actions executing

at any time, day or night, click any time.

However, if you are a little
more mindful about that,

you can click specific times

and actually have it sent
only Monday through Friday,

nine to 5:00 PM

and I do wanna note that
this is already gonna be

in their time zone,

so nine to five in your
customer's time zone.

Something that I also love HubSpot does

is allows you to keep
in mind upcoming dates

that you don't want any
communications to happen.

So let's say a holiday is coming up,

great, you know, no one's
gonna be at their computer,

so you can add in a date

that you don't want any
communications going out.

Everything scheduled for
the 25th of December,

for example, will then be
sent on the 26th of December.

Next up, let's talk about
unenrollment and suppression.

So the first thing is,
do you want your contacts

to be removed from other workflows

when they are enrolled in your workflow?

So we can actually say,
"Nope, they can be enrolled

in as many workflows as they want,

or you can say, remove
them from everything else,

or let's just remove them
from this one workflow.

So really make sure

that you're working with
everyone else on your team

who is also creating Workflows

to make sure that they are
working with one another.

The next is figuring out what to do

when a contact no longer meets
the enrollment conditions.

So let's say you are enrolling everyone

in this particular city, in this Workflow,

while what happens when that contact moves

and they're no longer part of that city?

Do you still want them to
be part of this Workflow

or do we need to unenroll them?

And then finally, you have
some decision making here to do

about when two contacts are merged,

whether the newly created
contact enrolled in this Workflow

should trigger another criteria.

Finally, you have a suppression list.

And the suppression list basically says

if you're part of this list,

even if you do meet all of the criteria

for getting in this workflow,

you are not gonna be
enrolled in this workflow.

So in order to get the lists here,

make sure you create a list
in your marketing account.

So the next thing that I wanna
talk about is notifications.

Now you can send notifications

to specific people or
specific teams within HubSpot.

Just wanna reiterate all
of these notifications

are internal only.

So one, you can send notifications

when the workflow moves into
the needs review category.

Now, workflows will
move into this category

when there's just a
lot of alerts going on.

You can tell that something's not right,

they'll move into the
needs review category

and then certain people will get notified.

I highly recommend turning this on

just to make sure that
you don't necessarily

have to go in every single time,

but HubSpot will send you
a notification saying,

"Hey, check this out."

The other thing that you
can set notifications up

for is when Workflows enrollment changes.

So let's say something's
changed in the workflow,

you wanna make sure
that the workflow owner

is aware of that.

Whenever you create a workflow,

you obviously have a goal behind it.

Maybe it's getting meetings scheduled,

maybe it's having folks complete a form.

Whatever it is,

you wanna make sure
you're tracking that goal

and making sure your Workflow
is doing the work for you.

So here you can click viewer edit goal,

and right here you can set up filters.

So I can say, "I want my goal to be

that meeting booked is any of schedules

or any of rescheduled."

I'm gonna click update, filter, and save.

And now once people start
going through my workflow,

once they start booking meetings,

I can see what percentage of my contacts

are actually booking meetings for me.

I can also see it month over month

to know if I'm doing something
differently in a month

or what's causing that spike.

So just a really good way to
make sure that your workflow

is doing what it needs to do.

Finally, if I go over to changes,

I will be able to see all of the changes

that anyone has made and the timestamp.

So just to make sure

that we're keeping track
of what's changing,

who's changing it, and when.

Now, you wanna make sure
you test your workflow

before you review and
publish your workflow.

Workflows are a big deal

and there are a lot of
little errors that can occur,

especially the more complicated
you make your workflow.

So I would highly recommend
clicking this test button

and you can preview it for any contact.

So I'm gonna preview it for Edna Frank,

and I'm actually gonna send
myself the HubSpot emails

that Edna would receive.

So if I click test,

I'll actually be sent the WhatsApp message

be added to this list, and
I'll go through all of this.

Now again, testing is just for yourself.

So even if you click test,

you are the only person who
is gonna get that message,

no one else will.

So this is a really great way

to make sure that there are no typos

in any of the messages they're
executing at the right time,

they make sense one after the other.

So please, please, please,

if you get nothing from this video,

make sure that you test your workflow

before you actually
click review and publish.

When you click review and publish,

go through everything
that we just talked about.

So who's enrolled, what the
workflow actually looks like,

how you get folks unenrolled,
the timing, the notifications.

Again, you just wanna make
sure that this looks perfect

before you click turn on.

(video whooshing)

Now, that was just one example
of how to use a Workflow,

but there are so many other use cases.

For instance, for marketing use cases,

you can send an email series

when a form is submitted,
what we just did.

You can also send welcome
emails to new customers

or subscribers or send
re-engagement emails

to cold leads for sales.

You can use Workflows for lead assignments

or lead status or lifecycle stage updates,

or my favorite deal stage automation.

So when a deal stage
reaches a certain stage,

maybe there's a task
that goes to a sales rep.

For service,

there are a couple things
we can do here as well.

We can set up ticket reminders
if an SLA is coming up

or we can even make the sales

to service handoff a lot smoother.

So maybe when a deal closes,

we can alert the customer success manager

to start working this customer.

Now if you're looking for
more technical Workflows,

we have you covered with Operations Hub.

So you can create Workflows
based on custom code actions.

So you can write code in
a HubSpot Workflow action.

And really the use cases
here are unlimited.

You can also format data action.

So there's also a ton
of applications here,

but by formatting actions,

it basically helps you edit property data

as a record passes through a Workflow.

And for webhooks, you can
send packets of record data

to external systems when a
record goes through a Workflow.

And finally, one of the
best parts about Workflows

is that you can also integrate it

with some of our partners
such as Zoom, Slack or Asana.

So it's not just completely HubSpot based.

Now you guys know I love HubSpot,

but don't just take my word for it.

G2 has recently crowned us as leaders

in the mid-market and enterprise spaces.

So if you have Pro and Enterprise,

get started with Workflows today.

And if you don't sign up
for our HubSpot CRM today.