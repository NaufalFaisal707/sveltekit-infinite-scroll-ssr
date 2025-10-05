<script lang="ts">
    import { inview } from "svelte-inview";
    import { SvelteURLSearchParams } from "svelte/reactivity";

    let { data } = $props<{ data: unknown }>();

    let users = $state(data.users);
    let fetchingState = $state<"ready" | "fetching" | null>("ready");
    let offsetCount = $state(1);
    let limitState = $state(data.limit);

    async function fetchUsers() {
        if (users.length < Number(limitState)) {
            fetchingState = null;
        }

        if (fetchingState === "ready") {
            fetchingState = "fetching";

            const fetchParams = new SvelteURLSearchParams();
            fetchParams.append("skip", (limitState * offsetCount).toString());

            const result = await fetch(`/?${fetchParams.toString()}`, {
                method: "GET",
            });

            const jsonResult = await result.json();

            users = [...users, ...jsonResult.users];

            if (jsonResult.users.length < Number(limitState)) {
                fetchingState = null;
            } else {
                offsetCount++;
                fetchingState = "ready";
            }
        }
    }
</script>

<div class="overflow-x-auto m-3">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Job</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {#each users as { id, firstName, lastName, email, image, address, company } (id + email)}
                <tr>
                    <td>{id}</td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <img
                                        loading="lazy"
                                        src={image}
                                        alt="profile"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">
                                    {firstName}
                                    {lastName}
                                </div>
                                <div class="text-sm opacity-50">
                                    {address.country}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h1 class="text-nowrap">
                            {company.name}
                        </h1>
                        <span class="badge badge-ghost badge-sm text-nowrap">
                            {company.title}
                        </span>
                    </td>
                    <td>{email}</td>
                </tr>
            {/each}

            {#if fetchingState === "ready" || fetchingState === "fetching"}
                <tr use:inview oninview_enter={fetchUsers}>
                    <td>
                        <div class="skeleton h-4 w-4"></div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div
                                class="skeleton h-12 w-12 shrink-0 rounded-full"
                            ></div>
                            <div>
                                <div class="font-bold mb-3">
                                    <div class="skeleton h-4 w-32"></div>
                                </div>
                                <div class="text-sm opacity-50">
                                    <div class="skeleton h-4 w-16"></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="skeleton h-4 w-32"></div>
                        <br />
                        <div class="skeleton h-4 w-20"></div>
                    </td>
                    <td>
                        <div class="skeleton h-4 w-52"></div>
                    </td>
                </tr>

                {#each Array(4)}
                    <tr>
                        <td>
                            <div class="skeleton h-4 w-4"></div>
                        </td>
                        <td>
                            <div class="flex items-center gap-3">
                                <div
                                    class="skeleton h-12 w-12 shrink-0 rounded-full"
                                ></div>
                                <div>
                                    <div class="font-bold mb-3">
                                        <div class="skeleton h-4 w-32"></div>
                                    </div>
                                    <div class="text-sm opacity-50">
                                        <div class="skeleton h-4 w-16"></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="skeleton h-4 w-32 pb-3"></div>
                            <div class="skeleton h-4 w-20"></div>
                        </td>
                        <td>
                            <div class="skeleton h-4 w-52"></div>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
